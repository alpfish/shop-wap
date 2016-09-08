import Vue from 'vue'
import Vuex from 'vuex'
import cart from 'modules/cart'
import goodsList from 'modules/goods-list'
import goodsCategory from 'modules/goods-category'

Vue.use(Vuex)

export default new Vuex.Store({
  strict: true,
  modules: {
    cart,
    goodsList,
    goodsCategory,
  }
})
