<template>
  <view-box>
    <button slot="header" @click="$toast({message: '操作成功', icon: 'success'})">ToastPlugin</button>

    <button slot="header" @click="$loading.show({text: '加载中', place: 'page', color: 'red', size: '24px'})">Loading Show</button>
    <button slot="header" @click="$loading.hide()">Loading Hide</button>

  </view-box>
</template>

<script>
import {
  Loading,
  Spinner,
  ViewBox,
} from 'ui/components'

export default {
  components: {
    Loading,
    Spinner,
    ViewBox,
  },

  data () {
    return {
      loading: true,
      types: ['android', 'ios', 'ios-small', 'bubbles', 'circles', 'crescent', 'dots', 'lines', 'ripple', 'spiral']
    }
  },

  methods: {
  },



}

</script>

<style lang="less">
.home-bottom {
  height: 100px;
  background: #000;
  width: 100%;
}
</style>
