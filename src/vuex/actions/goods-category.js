import * as types from 'src/vuex/mutation-types'
import Api from 'libs/api'

// 设置商品类目树状态
export const setTree = function({dispatch}) {
  Api.getGoodsCategoryTree(
    (success) => {
      dispatch(types.SET_GOODS_CATEGORY_TREE, success.categories)
    },
    (errors) => console.log(errors)
  )
}

export const setCurrentPid = function({dispatch}, pid) {
  dispatch (types.SET_GOODS_CATEGORY_CURRENT_PID, pid)
}
