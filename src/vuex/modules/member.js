import {
  SET_AUTH,
  CANCEL_AUTH,
  SET_ADDRESSES,
  SELECT_ADDRESS,
} from 'src/vuex/mutation-types'

const state = {
  auth: false,
  info: {},
  addresses: [],
  selectedAddressId: null,
}

const mutations = {

  [SET_AUTH] (state, member) {
    state.auth = true
    state.info = member
  },

  [CANCEL_AUTH] (state) {
    state.auth = false
    state.info = {}
  },

  // 设置、更新或添加地址, 必须是二维数组形式，添加/更新用 [ ] 包裹
  [SET_ADDRESSES] (state, addresses) {
    _.forEach(addresses, function(value) {
      if (value.isdefault) { // 更新默认地址只有一个
        _.forEach(state.addresses, (value, key) => {
          value.isdefault = false
          state.addresses.$set(key, value)
        })
      }
      let index = _.findIndex(state.addresses, { 'id': value.id })
      if (index >= 0) {
        state.addresses.$set(index, value) // 更新
      } else {
        state.addresses.push(value) // 添加
      }
    });
  },

  [SELECT_ADDRESS] (state, id) {
    state.selectedAddressId = parseInt(id)
  },

}

export default {
  state,
  mutations
}
