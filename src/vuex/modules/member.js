import {
  SET_AUTH,
  CANCEL_AUTH,
} from 'src/vuex/mutation-types'

const state = {
  auth: false,
  info: {},
}

const mutations = {
  [SET_AUTH](state, member) {
    state.auth = true
    state.info = member
  },
  [CANCEL_AUTH](state) {
    state.auth = false
    state.info = {}
  }
}

export default {
  state,
  mutations
}
