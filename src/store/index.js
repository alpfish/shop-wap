import Vue from 'vue'
import Vuex from 'vuex'
import app from './modules/app'
import cart from './modules/cart'
import member from './modules/member'
import promotion from './modules/promotion'

Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    app,
    cart,
    member,
    promotion,
  },

  strict: process.env.NODE_ENV !== 'production'
})

export default store
