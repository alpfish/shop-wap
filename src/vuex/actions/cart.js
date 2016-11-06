import * as types from 'src/vuex/mutation-types'
import Api from 'libs/api'
import LocalCart from 'libs/local-cart'
import { auth } from 'src/vuex/getters'
import { TOKEN_KEY } from 'src/config'

export const loadCart = ({dispatch, state}) => {
  // 读取缓存
  let params = {}
  if (!_.isEmpty(LocalCart.get()) && !auth()) {
    params.buys = LocalCart.get()
  }
  // 截流， 使用 token 而不是 auth() 判断，避免认证与获取购物车同步，导致获取购物车失败
  if (!Cache.get(TOKEN_KEY) && _.isEmpty(params.buys)) {
    dispatch(types.SET_CART_LOADED, true)
    return
  }

  dispatch(types.SET_CART_LOADED, false)
  Api.request({
      url: 'cart/lists',
      method: 'GET',
      params: params
    },
    (response) => {
      dispatch(types.SET_CART_LOADED, true)
      dispatch(types.CLEAR_CART) // 因为使用ADD_TO_CART，清空是为了防止重复添加历史条目
      dispatch(types.ADD_TO_CART, response.data.lists)
    },
    (response) => {}
  )
}

export const addToCart = ({dispatch, state}, sku_id, buy_nums) => {
  // 存在则更新
  let found = _.find(state.cart.added, (v) => v.sku_id == sku_id)
  if (found) {
    buy_nums += found.buy_nums
    update({dispatch}, sku_id, buy_nums)
    return
  }
  let buys = JSON.stringify([
    {
      sku_id,
      buy_nums
    }
  ])
  Api.request({
      url: 'cart/add',
      method: 'GET',
      params: {
        buys
      },
    },
    (response) => {
      let added = response.data.added
      dispatch(types.ADD_TO_CART, added)
      // 本地购物车添加
      if (!auth()) {
        LocalCart.add(added)
      }
      console.log("From Origin Added");
    },
    (response) => {}
  )
}

// 同步本地购物车到数据库
export const syncCart = ({dispatch}) => {
  // 标记加载失败，使路由自动更新购物车
  dispatch(types.SET_CART_LOADED, false)
  if (_.isEmpty(LocalCart.get())) return
  Api.request({
      url: 'cart/add',
      method: 'GET',
      params: {
        buys: JSON.stringify(LocalCart.get())
      },
    },
    (response) => {
      // 清空缓存
      LocalCart.clear()
    },
    (response) => {}
  )
}

export const update = ({dispatch}, sku_id, buy_nums, new_sku_id = null) => {

  let params = {
    sku_id,
    buy_nums,
  }
  if (new_sku_id) {
    params.new_sku_id = new_sku_id
    dispatch(types.DELETE_FROM_CART, [new_sku_id])
  }
  Api.request({
      url: 'cart/update',
      method: 'GET',
      params: params,
    },
    (response) => {
      let newData = _.head(response.data.updated)
      dispatch(types.UPDATE_TO_CART, sku_id, newData)
      if (!auth()) {
        LocalCart.update(sku_id, newData)
      }
      console.log("Updated.", newData.sku_id, newData.buy_nums);
    },
    (response) => {}
  )
}

export const deleteCartSkus = ({dispatch}, sku_ids) => {
  dispatch(types.DELETE_FROM_CART, sku_ids)
  if (auth()) {
    Api.request({
        url: 'cart/delete',
        method: 'GET',
        params: {
          sku_ids: _.isArray(sku_ids) ? JSON.stringify(sku_ids) : sku_ids
        },
      },
      (response) => {},
      (response) => {}
    )
  } else {
    LocalCart.delete(sku_ids)
  }
}

export const clearCart = ({dispatch}) => {
  dispatch(types.CLEAR_CART)
  dispatch(types.SET_CART_LOADED, false)
}
