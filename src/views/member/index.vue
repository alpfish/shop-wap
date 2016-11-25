<template>
  <view-box>
    <x-header title="会员中心" back more></x-header>
    <cells>
      <cell title="地址管理" :link="{path: '/address'}"></cell>
    </cells>

    <x-button slot="bottom" @click.native="exit" text="退出登录" color="semi" style="width: 90%; margin-bottom: 1.9rem;"></x-button>
  </view-box>
</template>

<script>
import { mapActions } from 'vuex'
import {
  Cell,
  Cells,
  ViewBox,
  XButton,
  XHeader,
} from 'ui/components'

export default {
  components: {
    Cell,
    Cells,
    ViewBox,
    XButton,
    XHeader,
  },

  methods: {
    ...mapActions([
      'logout'
    ]),
    exit() {
      this.logout()
      this.$router.push('/')
    },
  },
  // END methods
}
</script>
