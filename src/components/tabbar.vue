<template>
<div>
  <tabbar slot="bottom">
    <tabbar-item v-link="{name: 'home'}" :active="route.name == 'home'">
      <icon slot="icon" name="shouye" :size="18" ></icon>
      <span slot="label">首页</span>
    </tabbar-item>
    <tabbar-item v-link="{name: 'category'}" :active="route.name == 'category'">
      <icon slot="icon" name="fenlei1" :size="18"></icon>
      <span slot="label">商品分类</span>
    </tabbar-item>
    <tabbar-item badge="2" v-link="{name: 'cart-list'}"  :active="route.name == 'cart-list'">
      <icon slot="icon" name="gouwuche" :size="18"></icon>
      <span slot="label">购物车</span>
    </tabbar-item>
    <tabbar-item dot v-link="{name: 'member'}"  :active="isMember">
      <icon slot="icon" name="wode" :size="18"></icon>
      <span slot="label">我的</span>
    </tabbar-item>
  </tabbar>
</div>
</template>

<script>
import { Icon, Tabbar, TabbarItem} from 'ui/components'

export default {
  components: {
    Icon,
    Tabbar,
    TabbarItem,
  },
  vuex: {
    getters: {
      route: (state) => state.route,
    }
  },
  computed: {
    isMember () {
      return /member/.test(this.route.path)
    },
  }
}
</script>
