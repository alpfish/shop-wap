import {
  SET_GOODS_LIST_CURRENT}
  from 'src/vuex/mutationTypes'

//状态容器
const state = {

  // 当前列表
  current: [],
  // 浏览历史
  // viewed: [],
  // 猜你喜欢
  // guessLike: [],
  // 推荐商品
  // recommend: []

  // 显示风格
  // 如: 单列，双列，单行...
  // style: 'default',

}

//变更方法
const mutations = {

  SET_GOODS_LIST_CURRENT (state, goods) {
    state.current = goods
  }

}

//输出到 store
export default {
  state,
  mutations
}
