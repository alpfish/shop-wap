import Api from 'src/libs/api'
import Cache from 'src/libs/cache'
import {
  TOKEN_KEY,
} from 'src/config'

const member = {
  state: {
    auth: false, // Boolean or Obeject
    addresses: [],
    selectedAddressId: null,
  },

  mutations: {
    // 会员登录认证
    SET_AUTH(state, member) {
      state.auth = member === Object(member) ? member : {}
    },
    CANCEL_AUTH(state) {
      state.auth = false
    },
    // 设置、更新或添加地址, 必须是二维数组形式(即单条添加/更新时用 [ ] 包裹)
    SET_ADDRESSES(state, addresses) {
      _.forEach(addresses, function(value) {
        if (value.isdefault) { // 更新默认地址只有一个
          _.forEach(state.addresses, (value, key) => {
            value.isdefault = false
            state.addresses.$set(key, value)
          })
        }
        let index = _.findIndex(state.addresses, {
          'id': value.id
        })
        if (index >= 0) {
          state.addresses.$set(index, value) // 更新
        } else {
          state.addresses.push(value) // 添加
        }
      });
    },
    SELECT_ADDRESS(state, id) {
      state.selectedAddressId = parseInt(id)
    },

  },
  // END mutations

  actions: {
    tokenLogin({commit}) {
      if (!Cache.get(TOKEN_KEY)) return
      Api.request (
        {url: 'member/login/token'},
        (res) => {
          commit('SET_AUTH', res.data.member)
          console.log('TOKEN LOGIN');
        },
        (res) => {
          commit('CANCEL_AUTH')
          Cache.delete(TOKEN_KEY)
        }
      )
    },
    logout({commit}) {
      commit('CANCEL_AUTH')
      Cache.delete(TOKEN_KEY)
      // TODO 清空购物车
    }

  }
}

export default member
