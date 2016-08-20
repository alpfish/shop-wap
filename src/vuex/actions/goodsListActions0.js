import * as types from 'src/vuex/mutationTypes'
import Api from 'libs/api'

// 设置商品列表
export const setGoodsList = function({dispatch, state}, query = {}) {
  // 状态初始化
  dispatch( types.SET_GOODS_LIST, [])
  dispatch( types.SET_GOODS_LIST_LOADED, false)
  // 获取状态内存缓存
  let queryStr = JSON.stringify(query)
  let cache = _.find(state.goodsList.cache, item => item.queryStr == queryStr)
  if (_.isEmpty(cache)) {
    Api.search (
      query,
      (res) => {
        dispatch( types.SET_GOODS_LIST, res)
        dispatch( types.SET_GOODS_LIST_LOADED, true)
        dispatch( types.SET_GOODS_LIST_LOADED_SUCCESS, true)
        dispatch( types.SET_GOODS_LIST_CACHE, queryStr, res)
      },
      (res) => {
        dispatch( types.SET_GOODS_LIST_LOADED, true)
        dispatch( types.SET_GOODS_LIST_LOADED_SUCCESS, false)
      }
    )
  }
  else {
    dispatch( types.SET_GOODS_LIST, cache.searched)
    dispatch( types.SET_GOODS_LIST_LOADED, true)
    dispatch( types.SET_GOODS_LIST_LOADED_SUCCESS, true)
  }

}

// 追加商品列表
export const addToGoodsList = function({dispatch, state}, addQuery = {}, cacheQuery = {}) {
  // 状态初始化
  dispatch( types.SET_GOODS_LIST_LOADED, false)
  // 获取缓存键
  let cacheKey = JSON.stringify(cacheQuery)
  Api.search (
    addQuery,
    (res) => {
      // 将原有的商品合并到响应到的数据中，其他数据以响应为准
      res.goods.push.apply(res.goods, state.goodsList.searched.goods)
      dispatch( types.SET_GOODS_LIST_LOADED, true)
      dispatch( types.SET_GOODS_LIST_LOADED_SUCCESS, true)
      dispatch( types.SET_GOODS_LIST, res)
      dispatch( types.SET_GOODS_LIST_CACHE, cacheKey, res)
    },
    (res) => {
      dispatch( types.SET_GOODS_LIST_LOADED, true)
      dispatch( types.SET_GOODS_LIST_LOADED_SUCCESS, false)
    }
  )
}
