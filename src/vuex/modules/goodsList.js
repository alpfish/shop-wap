import {
  SET_GOODS_LIST,
  SET_GOODS_LIST_CACHE,
  SET_GOODS_LIST_LOADED,
  SET_GOODS_LIST_LOADED_SUCCESS,}
  from 'src/vuex/mutationTypes'

const state = {

  // 搜索数据
  searched:[],
  // 列表缓存
  // 于客户端内存，以减少请求次数和加快响应速度
  // 格式为 queryJson => searched 键值对的Map结构数据
  cache: new Map(),
  style: 'default',
  loaded: false,
  loadedSuccess: true,
}

const mutations = {

  [SET_GOODS_LIST] (state, searched) {
    state.searched = searched
  },

  [SET_GOODS_LIST_CACHE] (state, queryJson, searched) {
    queryJson = _.isString(queryJson) ? queryJson : JSON.stringify(queryJson)
    state.cache.set(queryJson, searched)
  },

  [SET_GOODS_LIST_LOADED] (state, resBool) {
    state.loaded = resBool
  },

  [SET_GOODS_LIST_LOADED_SUCCESS] (state, resBool) {
    state.loadedSuccess = resBool
  },


}

//输出到 store
export default {
  state,
  mutations
}
