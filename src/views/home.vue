<template>
  <view-box style="background-color: #fff;">
    <x-header back more slot="header">首页</x-header>
    <div style="margin: 15px">
      <router-link to="/login"><x-button mini>登录</x-button></router-link>
      <x-button  mini color="blue" @click.native="$toast({message: '操作成功', icon: 'success'})">Toast</x-button>
      <x-button  mini color="red" @click.native="$loading.show({text: '加载中', place: 'page', size: '24px'})">Loading</x-button>
      <x-button  mini color="red" @click.native="$loading.hide()">Hide</x-button>
    </div>


  <p v-for="i in 50">&nbsp;</p>
  </view-box>
</template>

<script>
import { mapState } from 'vuex'

import {
  Cell,
  Cells,
  Checkbox,
  Icon,
  Loading,
  MessageBox,
  Popup,
  Spinner,
  Tab,
  TabItem,
  Textfield,
  ViewBox,
  XButton,
  XHeader,
  XNumber,
} from 'ui/components'

export default {
  components: {
    Cell,
    Cells,
    Checkbox,
    Icon,
    Loading,
    Popup,
    Spinner,
    Tab,
    TabItem,
    Textfield,
    ViewBox,
    XButton,
    XHeader,
    XNumber,
  },

  data () {
    return {
      loading: true,
      nums: 2,
    }
  },

  // computed: mapState({
  //   count: state => state.count,
  //   test: state => state.test,
  //   test1() {
  //     return 'test'
  //   },
  // }),

  computed: {
    // ...mapState({
    //   count: state => state.count,
    //   test: state => state.test,
    // }),
    ...mapState([
      'member',
    ]),
    test() {
      return 'test'
    },
  },

}

</script>

<style scoped lang="less">
@import "../ui/styles/_vars.less";


</style>
