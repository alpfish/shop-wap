<template>
  <div>
    <hr>
    <h1>购物车: </h1>
    <p v-for="p in goods">
      {{ p.id | json }} |
      {{ p.price | currency '¥' }} |
      {{ p.quantity }} |
      <button @click="addToCart(p, -1)"> - </button>
      <button @click="addToCart(p)"> + </button>
      <button @click="addToCart(p, -p.quantity)"> x </button>
    </p>
    <p v-if="!hasAdd[0]">
      购物车无记录...
    </p>
    <p v-if="loading">
      loading ...
    </p>
    <!-- 总计：{{ total | currency '¥' }} -->
  </div>
</template>

<script>
import {addToCart, updateCartMirror} from 'actions/cartActions'
import {getGoods} from 'getters/cartGetters'

export default{
  vuex: {
    getters: {
      hasAdd: ({cart}) => cart.added,
      goods: getGoods
    },
    actions: {
      addToCart,
      updateCartMirror,
    }
  },
  components: {
  },
  ready() {
    this.updateCartMirror()
  },
  computed: {
    loading: function() {
      return this.hasAdd[0] && !this.goods[0]
    }
  }
}
</script>

<style>
@import '~vux/dist/vux.css';
</style>
