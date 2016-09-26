import {
  UPDATE_LOADING,
  UPDATE_DIRECTION,
} from 'src/vuex/mutation-types'

const state = {
  loading: false,
  direction: 'forward',
}

const mutations = {
  [UPDATE_LOADING](state, status) {
    state.loading = !!status
  },
  [UPDATE_DIRECTION] (state, direction) {
    state.direction = direction
  }
}

export default {
  state,
  mutations
}
