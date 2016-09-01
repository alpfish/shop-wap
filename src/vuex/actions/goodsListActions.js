import * as types from 'src/vuex/mutationTypes'
import Api from 'libs/api'

// 设置列表数据
export const setGoodsList = function ({dispatch, state}, query = {}) {
  // 清空列表
  dispatch (types.SET_GOODS_LIST, null)
  dispatch (types.SET_GOODS_LIST_LOADED, false)
  Api.search (
    query,
    (res) => {
      dispatch (types.SET_GOODS_LIST_LOADED, true)
      dispatch (types.SET_GOODS_LIST_LOADED_SUCCESS, true)
      dispatch (types.SET_GOODS_LIST, res)
    },
    (res) => {
      dispatch (types.SET_GOODS_LIST_LOADED, true)
      dispatch (types.SET_GOODS_LIST_LOADED_SUCCESS, false)
    }
  )
}

// 追加列表数据
export const addToGoodsList = function ({dispatch, state}, addQuery = {}) {
  dispatch (types.SET_GOODS_LIST_LOADED, false)
  Api.search (
    addQuery,
    (res) => {
      dispatch (types.SET_GOODS_LIST_LOADED, true)
      dispatch (types.SET_GOODS_LIST_LOADED_SUCCESS, true)
      dispatch (types.SET_GOODS_LIST, res)
    },
    (res) => {
      dispatch (types.SET_GOODS_LIST_LOADED, true)
      dispatch (types.SET_GOODS_LIST_LOADED_SUCCESS, false)
    }
  )
}
