import Vue from 'vue'
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
            Vue.set(state.addresses, key, value)
          })
        }
        let index = _.findIndex(state.addresses, {
          'id': value.id
        })
        if (index >= 0) {
          Vue.set(state.addresses, index, value) // 更新
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
    tokenLogin({commit, dispatch}, payload = {}) {
      if (!Cache.get(TOKEN_KEY))  {
        payload.error && payload.error()
        return
      }
      Api.request (
        {url: 'member/login/token'},
        (res) => {
          commit('SET_AUTH', res.data.member)
          console.log('TOKEN LOGIN');
          // token 登录成功直接加载用户购物车，无 token 在路由钩子中判断加载本地购物车
          // 这里不同步购物车，放在手动登录成功后
          dispatch('loadCart')
          payload.success && payload.success()
        },
        (res) => {
          commit('CANCEL_AUTH')
          Cache.delete(TOKEN_KEY)
          payload.error && payload.error()
        }
      )
    },

    logout({commit}) {
      commit('CANCEL_AUTH')
      Cache.delete(TOKEN_KEY)
      commit('CLEAR_CART')
      commit('SET_CART_LOADED', false)
    },

    // 获取地址列表
    // 地址管理、订单结算等均会使用，所以封装在 action 中
    fetchAddresses({commit}) {
      Api.request (
        {url: 'member/address/list'},
        (res) => commit('SET_ADDRESSES', res.data.addresses),
        (res) => {}
      )
    },

  }
}

export default member
