<template>
<div class="page center">
  <view-box class="cart">
    <x-header title="会员中心"></x-header>
    <button-area >
      <p>Welcome! {{ username }}</p>
      <button-row>
        <button fill big raised color="red" text="退出" @click="exit"></button>
      </button-row>
    </button-area>
    <tabbar slot="bottom"></tabbar>
  </view-box>
</div>
</template>

<script>
import Tabbar from 'components/tabbar'
import { Button, ButtonRow, ButtonArea, ViewBox, XHeader, } from 'ui/components'
import {
  logout
} from 'actions/member'

export default {
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
  components: {
    Button,
    ButtonRow,
    ButtonArea,
    ViewBox,
    Tabbar,
    XHeader,
  }
}
</script>
<style lang="less">
//@import '../../ui/styles/index.less';
.page {
  position:fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
}
.center {
  display: flex;
  align-items: center;
  justify-content: center;
}

</style>
