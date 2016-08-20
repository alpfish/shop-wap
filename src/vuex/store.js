import Vue from 'vue'
import Vuex from 'vuex'
import cart from 'modules/cart'
import goodsList from 'modules/goodsList'
import goodsCategory from 'modules/goodsCategory'

Vue.use(Vuex)

export default new Vuex.Store({
  strict: true,
  modules: {
    cart,
    goodsList,
    goodsCategory,
  }
})
