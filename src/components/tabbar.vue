<template>
  <tabbar v-if="show">
    <tabbar-item label="首页" :link="{path: '/'}" :active="isHome" :icon="isHome ? 'shouye2' : 'shouye'"></tabbar-item>
    <tabbar-item label="商品" :link="{path: '/category'}" :active="isCategory" :icon="isCategory ? 'fenlei2' : 'fenlei1'"></tabbar-item>
    <tabbar-item label="购物车" :badge="cartCount" :link="{path: '/cart'}" :active="isCart" :icon="isCart ? 'cart-active' : 'cart'"></tabbar-item>
    <tabbar-item label="我的" :link="{path: '/member'}" :active="isMember" :icon="isMember ? 'wode2' : 'wode'"></tabbar-item>
  </tabbar>
</template>

<script>
import { mapState } from 'vuex'
import { Tabbar, TabbarItem} from 'ui/components'

export default {
  components: {
    Tabbar,
    TabbarItem,
  },
  computed: {
    ...mapState({
      added: state => state.cart.added,
      inputing: state => state.app.inputing,
    }),
    show () {
      let path = this.$route.path
      return !this.inputing && (path == '/' || path == '/category' || path == '/cart' || path == '/member')
    },
    cartCount () {
      return _.toString(_.sumBy(this.added, (item) => item.buy_nums))
    },
    isHome () {
      return this.$route.path == '/'
    },
    isCategory () {
      return this.$route.path == '/category'
    },
    isCart () {
      return this.$route.path == '/cart'
    },
    isMember () {
      return this.$route.path == '/member'
    },
  },
}
</script>
