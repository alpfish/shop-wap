<template>
  <view-box style="background-color: #fff;">
    <x-header back more slot="header">首页</x-header>
    <div style="margin: 15px">
      <router-link to="/login"><x-button mini>登录</x-button></router-link>
      <x-button  mini color="red" @click.native="$loading.show()">Loading</x-button>
      <x-button  mini color="red" @click.native="$loading.hide()">Hide</x-button>
      <x-button  mini color="blue" @click.native="$toast({message: '操作成功', icon: 'success'})">Toast</x-button>
      <x-button mini color="blue" @click.native="toastHandle()">Handle<x-button>
    </div>



    <tab>
      <tab-item :selected="demo === item" v-for="item in list" @click="demo = item">{{item}}</tab-item>
    </tab>

  <p v-for="i in 20">&nbsp;</p>
  </view-box>
</template>

<script>
import { mapState, mapGetters } from 'vuex'

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
      demo: '美食',
      list: ['精选', '美食', '电影', '酒店', '外卖'],
    }
  },



  computed: {
    ...mapState([
      'member',
    ]),
    ...mapGetters([
    ])
  },

  methods: {
    toastHandle() {
      let toast = this.$toast({message:'处理中', icon:'loading', autoHide: false})
      setTimeout(() => {
        toast.icon = 'success'
        toast.message = "操作成功"
      }, 3000);
      setTimeout(() => {
        toast.show = false
      }, 4500);
    }
  },

  mounted() {

  },

}

</script>

<style scoped lang="less">
@import "../ui/styles/_vars.less";
@import "../ui/styles/_mixins.less";

</style>
