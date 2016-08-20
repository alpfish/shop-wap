/******
 * 商品
 */
// 设置商品列表
export const SET_GOODS_LIST_CURRENT = 'SET_GOODS_LIST_CURRENT'

// 商品列表
export const SET_GOODS_LIST = 'SET_GOODS_LIST'
export const SET_GOODS_LIST_CACHE = 'SET_GOODS_LIST_CACHE'
export const SET_GOODS_LIST_LOADED = 'SET_GOODS_LIST_LOADED'
export const SET_GOODS_LIST_LOADED_SUCCESS = 'SET_GOODS_LIST_LOADED_SUCCESS'

// 设置详情商品条目
export const SET_GOODS_DETAIL_ITEM = 'SET_GOODS_DETAIL_ITEM'
// 设置商品类目树
export const SET_GOODS_CATEGORY_TREE = 'SET_GOODS_CATEGORY_TREE'

/********
 * 购物车
 */
// 添加，减少或删除购物车商品 cart.added
export const ADD_TO_CART = 'ADD_TO_CART'
// 更新购物车商品镜像
export const UPDATE_CART_MIRROR = 'UPDATE_CART_MIRROR'
// 结算请求
export const CHECKOUT_REQUEST = 'CHECKOUT_REQUEST'
// 结算成功
export const CHECKOUT_SUCCESS = 'CHECKOUT_SUCCESS'
// 结算失败
export const CHECKOUT_FAILURE = 'CHECKOUT_FAILURE'
