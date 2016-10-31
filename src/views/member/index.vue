<template>
<view-box>
  <x-header title="会员中心"></x-header>
  <list :title="username">
    <list-item title="添加收货地址" :link="{name: 'add-address'}"></list-item>
    <list-item title="会员注册" :link="{name: 'register'}"></list-item>
  </list>


  <button-area slot="bottom" class="member-bottom">
    <button-row>
      <button fill big raised color="red" text="退出" @click="exit"></button>
    </button-row>
  </button-area>
</view-box>
</template>

<script>
import {
  Button,
  ButtonRow,
  ButtonArea,
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
    Button,
    ButtonRow,
    ButtonArea,
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
