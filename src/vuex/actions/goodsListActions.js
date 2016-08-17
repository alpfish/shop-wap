import * as types from 'src/vuex/mutationTypes'
import goodsApi from 'api/goodsApi'

// 设置商品列表
export const setGoodsListCurrent = function({dispatch}, query) {
  query = Object(query)
  goodsApi.search (
    query,
    (result) => {
      dispatch( types.SET_GOODS_LIST_CURRENT, result.goods)
    }
  )
}
