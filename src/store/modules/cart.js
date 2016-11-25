import Vue from 'vue'
import Api from 'src/libs/api'
import Cache from 'src/libs/cache'
import LocalCart from 'src/libs/local-cart'
import { TOKEN_KEY } from 'src/config'

const cart = {
  state: {
    // 已添加, 为购物车商品对象的二维数组数据格式
    added: [],
    // 加载状态
    loaded: false,
  },

  mutations: {
    // 数据必须是购物商品对象的二维数组格式
    ADD_TO_CART(state, buys) {
      console.log('ADD_TO_CART');
      if (_.isEmpty(buys) || !_.isArray(buys)) return
      for (let i in buys) {
        let buy = buys[i]
        // 更新
        if (_.some(state.added, buy)) {
          state.added.$set(_.findIndex(state.added, (v) => v.sku_id == buy.sku_id), buy)
          // 添加
        } else {
          state.added.push(buy)
        }
      }
    },
    // payload: {sku_id, newData}
    UPDATE_TO_CART(state, payload = {}) {
      Vue.set(state.added, _.findIndex(state.added, (v) => v.sku_id == payload.sku_id), payload.newData)
      console.log('UPDATE_TO_CART');
    },

    DELETE_FROM_CART(state, sku_ids) {
      for (let i in sku_ids) {
        let index = _.findIndex(state.added, (item) => item.sku_id == sku_ids[i] )
        state.added.splice(index, 1)
        console.log('DELETE_FROM_CART', sku_ids[i]);
      }
    },

    CLEAR_CART (state) {
      state.added = []
    },

    SET_CART_LOADED (state, status) {
      state.loaded = !!status
    },
  },
  //END mutations

  actions: {
    // 购物车相关操作封装类型及位置
    // 选择规格：应用级组件，添加和更新都会使用到
    // 添加：应用级组件, 有用户点击交互，多处使用，故封装为应用级组件
    // 更新: 视图内，只在购物车中用到，为减少应用打包大小，故将代码封装到相关视图中
    // 删除: 视图内，同上
    // 加载：状态actions，在路由/视图中自动处理，故封装成 action 易于派发
    loadCart({commit, state}) {
      // params 存放未登录用户保存于本地的购物车缓存数据，登录用户则返回存储在服务器的数据
      let params = {}
      if (LocalCart.get() && !state.member.auth) {
        params.buys = LocalCart.get()
      }
      // 截流， 使用 token 而不是 auth，避免用户认证在获取购物车之后，导致获取购物车失败
      if (!Cache.get(TOKEN_KEY) && _.isEmpty(params.buys)) {
        commit('SET_CART_LOADED', true)
        return
      }
      // 异步购物车
      commit('SET_CART_LOADED', false)
      Api.request({
          url: 'cart/lists',
          method: 'GET',
          params: params
        },
        (res) => {
          commit('SET_CART_LOADED', true)
          // 清空是为了防止 ADD_TO_CART Mutation 重复添加历史条目
          commit('CLEAR_CART')
          commit('ADD_TO_CART', res.data.lists)
        },
        (res) => {}
      )
    },

  },
  //END actions
}

export default cart
