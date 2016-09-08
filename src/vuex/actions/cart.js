import * as types from 'src/vuex/mutationTypes'
import goodsApi from 'api/goodsApi'

// 添加,减少,删除 购物车商品
export const addToCart = ({dispatch}, iterm, quantity) => {
  dispatch(types.ADD_TO_CART, iterm, quantity)
}

// 更新购物车商品镜像
export const updateCartMirror = ({dispatch, state}) => {
  if (state.cart.goodsMirror.length === 0 && state.cart.added != 0) {
    goodsApi.search (
      {
        ids: state.cart.added.map(key => key.id)
      },
      (goods) => {
        console.log('===> 购物车 SearedMirror (', goods.length ,') record');
        dispatch(types.UPDATE_CART_MIRROR, goods)
      }
    )
  }
}
