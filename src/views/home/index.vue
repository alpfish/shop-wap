<!-- Home -->
<template>
<view-box>
  <!-- <x-header more back title="商品详情"></x-header> -->
  <x-header close title="商品详情" @on-close="onClose"></x-header>
  <list>
    <list-item title="帐户" subtitle="子标题" icon="wode" icon-color="red"></list-item>
    <list-item title="购物车" icon="gouwuche" icon-color="brand" v-link="{path: 'cart'}" arrow></list-item>
    <list-label><list-item title="开具发票" icon="chongzhi" ><switch slot="right" :value.sync="turn"></switch></list-item></list-label>
  </list>





  <!-- <alert :show.sync="turn" title="恭喜" button-text="确认">付款成功</alert> -->
  <!-- <toast :show.sync="turn" :time="500">操作成功</toast> -->
  <!-- <toast :show="turn" :time="500" type="warn">操作失败</toast> -->
  <!-- <dialog :show="turn" hide-on-blur> -->
  <!-- <confirm :show.sync="turn" title="删除所选的商品?" cancel-text="取消" confirm-text="删除"></confirm> -->

  <!-- <x-img
  border
  width="300px"
  height="300px"
  src="http://192.168.0.108/shop-wap/./uploadfile/goods/a5/23/3e/c4/57affd1d62e08.jpg">
  </x-img> -->
  <br v-for="i in 10">
</view-box>
</template>

<script>
import {
  Alert,
  Box,
  BoxItem,
  Badge,
  Checkbox,
  Confirm,
  ViewBox,
  Button,
  Dialog,
  Icon,
  List,
  ListItem,
  ListLabel,
  Switch,
  Textfield,
  Toast,
  XImg,
  XNumber,
  XHeader,
} from 'ui/components'

export default {
  components: {
    Alert,
    Box,
    BoxItem,
    Badge,
    Checkbox,
    Confirm,
    ViewBox,
    Button,
    Dialog,
    Icon,
    List,
    ListItem,
    ListLabel,
    Toast,
    Switch,
    Textfield,
    XImg,
    XNumber,
    XHeader,
  },
  data() {
    return {
      data: ['红色', '黄色', '白色'],
      checked: [],
      turn: false,
      num: 1,
    }
  },
  methods: {
    show () {
      this.turn = true
    },
    onClose() {
      alert()
    }
  },
  ready() {
    this.$cache.set('test', 'Hello world!');
    console.log(Cache.get('test'));
    this.$shop.header.show = true
    this.$shop.header.title = '购物车'
    console.log(this.$shop);
  }
}
</script>
<style scoped lang="less">
@import '../../ui/styles/_vars.less';
</style>
