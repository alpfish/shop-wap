<template>
<div v-if="show">
  <tabbar>
    <tabbar-item label="首页" :link="{name: 'home'}" :active="isHome" :icon="isHome ? 'shouye2' : 'shouye'"></tabbar-item>
    <tabbar-item label="商品" :link="{name: 'category'}" :active="isCategory" :icon="isCategory ? 'fenlei2' : 'fenlei1'"></tabbar-item>
    <tabbar-item label="购物车" :link="{name: 'cart'}" :active="isCart" :icon="isCart ? 'cart-active' : 'cart'" :badge="cartCount"></tabbar-item>
    <tabbar-item label="我的" :link="{name: 'member'}" :active="isMember" :icon="isMember ? 'wode2' : 'wode'"></tabbar-item>
  </tabbar>
</div>
</template>

<script>
import { Tabbar, TabbarItem} from 'ui/components'

export default {
  components: {
    Tabbar,
    TabbarItem,
  },
  vuex: {
    getters: {
      added: ({cart}) => cart.added,
      route: (state) => state.route,
      inputing: (state) => state.app.inputing,
    }
  },
  computed: {
    show () {
      let name = this.route.name
      return !this.inputing && (name == 'home' || name == 'category' || name == 'cart' || name == 'member')
    },
    cartCount () {
      return _.toString(_.sumBy(this.added, (item) => item.buy_nums))
    },
    isHome () {
      return this.route.name == 'home'
    },
    isCategory () {
      return this.route.name == 'category'
    },
    isCart () {
      return this.route.name == 'cart'
    },
    isMember () {
      return /member/.test(this.route.path)
    },
  }
}
</script>
