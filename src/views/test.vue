<!-- Home -->
<template>
<div>
  <p v-for="i in 10">1</p>
  <sticky>kwgkwg</sticky>
  <p v-for="i in 50">2</p>
</div>
</template>

<script>
import { Sticky } from 'vux-components/sticky'

export default {
  components: {
    Sticky
  },
}
</script>
