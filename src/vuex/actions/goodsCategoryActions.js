import * as types from 'src/vuex/mutationTypes'
import Api from 'libs/api'

// 设置商品类目树状态
export const setGoodsCategoryTree = function({dispatch}) {

  let key = 'GoodsCategoryTree'
  let value = Cache.get(key)
  if (_.isEmpty(value)) {
    Api.getGoodsCategoryTree(
      (success) => {
        value = success.categories
        Cache.set(key, value, { exp: 24*60*60 })
        dispatch(types.SET_GOODS_CATEGORY_TREE, value)
      },
      (errors) => console.log(errors)
    )
  } else {
    dispatch(types.SET_GOODS_CATEGORY_TREE, value)
  }
}
