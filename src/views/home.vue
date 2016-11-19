<template>
  <view-box style="background-color: #fff;">
    <x-header back more slot="header">首页</x-header>
    <div style="margin: 15px">
      <x-button  mini color="blue" @click.native="$toast({message: '操作成功', icon: 'success'})">Toast</x-button>
      <x-button  mini color="red" @click.native="$loading.show({text: '加载中', place: 'page', size: '24px'})">Show</x-button>
      <x-button  mini color="red" @click.native="$loading.hide()">Hide</x-button>
    </div>

    <div style="margin: 15px">
      <x-button fill color="primary" icon="gouwuche">加入购物车</x-button>
      <x-button fill color="primary" icon="gouwuche" disabled>加入购物车</x-button>
      <x-button fill color="warning">warning</x-button>
      <x-button fill color="warning" disabled>warning</x-button>
      <x-button color='default'>default</x-button>
      <x-button color='default' disabled>default</x-button>
      <x-button fill color='blue'>blue</x-button>
      <x-button fill color='blue' disabled>blue</x-button>
      <x-button color='blue'>blue</x-button>
      <x-button color='blue' disabled>blue</x-button>
      <x-button mini color="purple" >迷你</x-button>
      <x-button mini color="purple" disabled>禁用</x-button>
      <x-button mini>文字</x-button>
    </div>
    <x-number v-model="nums" :min="1" :max="5"></x-number>







  <p v-for="i in 50">&nbsp;</p>
  </view-box>
</template>

<script>
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

  methods: {

  },



}

</script>

<style lang="less">
@import "../ui/styles/_fn.less";


</style>
