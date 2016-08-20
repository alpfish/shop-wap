import {
  SET_GOODS_LIST,
  SET_GOODS_LIST_CACHE,
  SET_GOODS_LIST_LOADED,
  SET_GOODS_LIST_LOADED_SUCCESS,}
  from 'src/vuex/mutationTypes'

const state = {

  // 搜索到的当前列表数据
  searched:[],

  // 列表缓存
  // 缓存于客户端内存中，以减少请求次数，及加快响应速度
  // 格式为 {queryStr:'Query Json值', searched:'搜索结果值'} 的对象数组
  cache: [],

  loaded: false,
  loadedSuccess: false,
  // 列表风格，如: 单列，双列，单行...
  style: 'default',
}

const mutations = {

  [SET_GOODS_LIST] (state, searched) {
    state.searched = searched
  },

  [SET_GOODS_LIST_CACHE] (state, queryStr, searched) {
    let kv = {
        'queryStr': queryStr,
        'searched': searched
    }
    // find()函数目前移动端国产浏览器支持不好，还不知lodash的_.find如何，需要 babel-polyfill
    if (! _.isEmpty(_.find(state.cache, (item) => item.queryStr === queryStr))) {
      for (var i = 0; i < state.cache.length; i++) {
        if (state.cache[i].queryStr === queryStr) {
          state.cache[i] = kv
          break
        }
      }
    } else {
      state.cache.push(kv)
    }
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
