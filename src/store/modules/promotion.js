import Vue from 'vue'
import Api from 'src/libs/api'

const promotion = {
  state: {
    time:  [],
    goods: [],
    order: [],
    // 是否已经获取所有促销信息
    fetched: false,
  },

  mutations: {
    SET_PROMOTIONS(state, payload = {}) {
      state.time = payload.time || []
      state.goods = payload.goods || []
      state.order = payload.order || []
    },
    SET_PROMOTION_FETCHED(state, payload) {
      state.fetched = !!payload
    }
  },

  actions: {
    fetchPromotions({commit, state}) {
      if (state.fetched) return
      Api.request (
        {url: 'promotion/all'},
        (res) => {
          console.log(res.data);
          let data = res.data
          commit('SET_PROMOTIONS', data)
          commit('SET_PROMOTION_FETCHED', true)
        },
        (res) => {
          commit('SET_PROMOTION_FETCHED', false)
        }
      )
    }

  },
}

export default promotion
