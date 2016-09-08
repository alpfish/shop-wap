import {
  SET_GOODS_CATEGORY_TREE,
  SET_GOODS_CATEGORY_CURRENT_PID}
  from 'src/vuex/mutation-types'

const state = {
  tree: [],
  currentPid: 1
}

const mutations = {
  [SET_GOODS_CATEGORY_TREE] (state, categories) {
    state.tree = _.toArray(categories)
  },
  [SET_GOODS_CATEGORY_CURRENT_PID] (state, pid = null) {
    if (pid === null) {
      if (_.isEmpty(state.tree)) {
        setTimeout(() => state.currentPid = _.head(_.sortBy(state.tree, 'sort'))['cid'], 1000)
      }
      state.currentPid = _.head(_.sortBy(state.tree, 'sort'))['cid']
    } else {
        state.currentPid = pid
    }
  }
}

export default {
  state,
  mutations
}
