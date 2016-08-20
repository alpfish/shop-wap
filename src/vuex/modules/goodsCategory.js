import {
  SET_GOODS_CATEGORY_TREE}
  from '../mutationTypes'

const state = {
  tree: []
}

const mutations = {
  [SET_GOODS_CATEGORY_TREE] (state, categories) {
    state.tree = _.toArray(categories)
  }
}

export default {
  state,
  mutations
}
