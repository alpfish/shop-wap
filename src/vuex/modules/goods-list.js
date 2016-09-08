import {
  SET_GOODS_LIST,
  SET_GOODS_LIST_LOADED,
  SET_GOODS_LIST_LOADED_SUCCESS,
}
from 'src/vuex/mutation-types'

const state = {
  // 搜索数据
  searched: {
    'goods': new Set(),
    'total': null,
    'page': null,
    'per_page': null
  },
  style: 'default',
  loaded: false,
  loadedSuccess: true,
}

const mutations = {

  [SET_GOODS_LIST](state, searched = null) {
    if (_.isNull(searched)) {
      state.searched.goods = new Set()
    } else {
      state.searched.goods = new Set([...state.searched.goods, ...searched.goods])
      state.searched.total = searched.total
      state.searched.page = searched.page
      state.searched.per_page = searched.per_page
    }
  },

  [SET_GOODS_LIST_LOADED](state, resBool) {
    state.loaded = resBool
  },

  [SET_GOODS_LIST_LOADED_SUCCESS](state, resBool) {
    state.loadedSuccess = resBool
  },

}

//输出到 store
export default {
  state,
  mutations
}
