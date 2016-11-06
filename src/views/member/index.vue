<template>
<view-box>
  <x-header title="会员中心" back more></x-header>
  <list :title="username">
    <list-item title="地址管理" :link="{name: 'address'}"></list-item>
    <list-item title="会员注册" :link="{name: 'register'}"></list-item>
  </list>



  <x-button slot="bottom" @click="exit" text="退出登录" color="semi" style="width: 90%; margin-bottom: 1.9rem;"></x-button>

</view-box>
</template>

<script>
import {
  XButton,
  List,
  ListItem,
  ViewBox,
  XHeader,
} from 'ui/components'
import {
  logout
} from 'actions/member'

export default {
  components: {
    XButton,
    List,
    ListItem,
    ViewBox,
    XHeader,
  },
  vuex: {
    getters: {
      username: state => state.member.info.username
    },
    actions: {
      logout
    }
  },
  methods: {
    exit() {
      this.logout()
      this.$route.router.go('/');
    },
  },

}
</script>
<style  lang="less">
.member-bottom {
    margin-bottom: 150/75rem;
}
</style>
