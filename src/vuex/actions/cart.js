/*
目前购物系统是基于登录用户
若开发支持未登录用户，可采用以下方案：
基于登录购物车系统接口，前端只保存购物车ids, 其他所有操作和数据同步均与登录用户一致，
登录后只需要将数据库相应购物车ids添加上对应的用户id即可。
*/
import * as types from 'src/vuex/mutation-types'
import Api from 'libs/api'

/*
* 加载购物车数据, 每次进入购物车页面都从服务器加载，以最大程度确保库存同步
*/
export const loadCart = ({dispatch}) => {
  dispatch(types.SET_CART_LOADED, false)

  // TODO 获取未登录购物车ids

  Api.request(
    {
      url: 'cart/lists',
      method: 'GET',
      params: {}
    },
    (response) => {
      dispatch(types.SET_CART_LOADED, true)
      // let lists = response.data.lists
      dispatch(types.SET_TO_CART, response.data.lists)

      // for (let item in lists) {
      //   dispatch(types.SET_TO_CART, lists[item])
      // }
      // console.log(response);
    },
    (response) => {
      console.log(response);
    }
  )
}

// 添加,减少,删除 购物车商品
// export const addToCart = ({dispatch}, iterm, quantity) => {
//   dispatch(types.ADD_TO_CART, iterm, quantity)
// }


/*
加载购物车数据, 每次进入购物车页面都从服务器加载，以最大程度确保库存同步，
已登录用户：直接从服务器获取用户购物车数据
未登录用户：(暂不处理，即目前购物车的所有操作都需要登录)两种方案：1.客户端存储购物车ids， 2.客户端存储所有数据
无论哪种方式，最后 store 中 added 的数据都是一致的
loadCart

添加商品
addToCart

更新商品
updateCart

删除商品
deleteCartSku

*/
