<template>
<div class="page center">
  <button-area >
    <p>Welcome! {{ username }}</p>
    <button-row>
      <button fill big raised color="red" text="退出" @click="exit"></button>
    </button-row>
  </button-area>
</div>
</template>

<script>
import { Button, ButtonRow, ButtonArea } from 'ui/components'
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
  }
}
</script>
<style lang="less">
//@import '../../ui/style/index.less';
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
