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

/*
加载购物车数据, 每次进入购物车页面都从服务器加载，以最大程度确保库存同步，
已登录用户：直接从服务器获取用户购物车数据
未登录用户：(暂不处理)两种方案：1.购物车数据存储在客户端， 2.和已登录用户一样，只是购物车用户ID为空
无论哪种方式，最后 store 中 added 的数据都是一致的
loadCart

添加商品
addToCart

更新规格或数量
updateCartSku
updateCartQuantity

删除商品
deleteCartSku

*/
