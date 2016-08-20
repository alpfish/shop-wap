import * as types from 'src/vuex/mutationTypes'
import Api from 'libs/api'

// 设置列表数据
export const setGoodsList = function({dispatch, state}, query = {}) {
  // 状态初始化
  dispatch( types.SET_GOODS_LIST, [])
  dispatch( types.SET_GOODS_LIST_LOADED, false)
  // 获取状态内存缓存
  let queryJson = JSON.stringify(query)
  if (state.goodsList.cache.has(queryJson)) {
    dispatch( types.SET_GOODS_LIST, state.goodsList.cache.get(queryJson))
    dispatch( types.SET_GOODS_LIST_LOADED, true)
    dispatch( types.SET_GOODS_LIST_LOADED_SUCCESS, true)
  } else {
    Api.search (
      query,
      (res) => {
        dispatch( types.SET_GOODS_LIST, res)
        dispatch( types.SET_GOODS_LIST_LOADED, true)
        dispatch( types.SET_GOODS_LIST_LOADED_SUCCESS, true)
        dispatch( types.SET_GOODS_LIST_CACHE, queryJson, res)
      },
      (res) => {
        dispatch( types.SET_GOODS_LIST_LOADED, true)
        dispatch( types.SET_GOODS_LIST_LOADED_SUCCESS, false)
      }
    )
  }
}

// 追加列表数据
export const addToGoodsList = function({dispatch, state}, addQuery = {}, cacheQuery = {}) {
  // 追加状态初始化
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
