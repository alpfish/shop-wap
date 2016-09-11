<template>
<div>
  <button-area>
    <p>Welcome! {{ username }}</p>
    <button-row>
      <button fill big raised color="red" text="退出" @click="exit"></button>
    </button-row>
  </button-area>
</div>
</template>

<script>
import Button from 'components/ui/button/button'
import ButtonRow from 'components/ui/button/button-row'
import ButtonArea from 'components/ui/button/button-area'

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
