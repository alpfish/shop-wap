import {
  SET_TO_CART,
  SET_CART_LOADED,
}
from 'src/vuex/mutation-types'

const state = {
  // 购物车商品
  added: [],
  // 购物车状态
  loaded: false,
  adding: false,
  updating: false,
  deleting: false,
}

const mutations = {
  SET_TO_CART(state, items) {
    state.added= items
  },

  ADD_TO_CART() {

  },

  UPDATE_FROM_CART() {

  },

  DELETE_FROM_CART() {

  },

  SET_CART_LOADED(state, status) {
    state.loaded = !!status
  },

  SET_CART_ADDING(state, status) {
    state.adding = !!status
  },

  SET_CART_UPDATING(state, status) {
    state.updating = !!status
  },

  SET_CART_DELETING(state, status) {
    state.deleting = !!status
  },

}

export default {
  state,
  mutations
}
