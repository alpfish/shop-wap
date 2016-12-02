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
    // 以下数据需要在后台处理好后返回
    // 1. 赠品
    // 2. JSON 格式
    fetchPromotions({commit, state}) {
      if (state.fetched) return
      Api.request (
        {url: 'promotion/all'},
        (res) => {
          commit('SET_PROMOTIONS', res.data)
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
