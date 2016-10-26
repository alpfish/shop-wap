<!-- Home -->
<template>
<view-box>
  <list title="我的帐户">
    <list-item title="帐户" subtitle="子标题中" icon="wode" icon-color="red" arrow></list-item>
    <list-item title="左侧" img="http://cn.vuejs.org/images/logo.png"><span slot="right">右侧</span></list-item>
    <list-item title="购物车" icon="gouwuche" icon-color="brand" v-link="{path: 'cart/list'}" arrow></list-item>
  </list>

  <list>
    <list-label><list-item title="开具发票" icon="chongzhi" ><switch slot="right" :value.sync="turn"></switch></list-item></list-label>
  </list>

  <list>
    <list-label><list-item><checkbox slot="left" :value.sync="checked" option="红色" label="红色"></checkbox></list-item></list-label>
    <list-label><list-item><checkbox slot="left" :value.sync="checked" option="黄色" label="黄色"></checkbox></list-item></list-label>
  </list>

  <list>
    <list-item><x-number :value.sync="num" :min="0" :max="10" :step="1"></x-number></list-item>
  </list>

  <!-- <alert :show.sync="turn" title="恭喜" button-text="确认">付款成功</alert> -->
  <!-- <toast :show.sync="turn" :time="500">操作成功</toast> -->
  <!-- <toast :show="turn" :time="500" type="warn">操作失败</toast> -->
  <!-- <dialog :show="turn" hide-on-blur> -->
  <confirm :show.sync="turn" title="删除所选的商品?" cancel-text="取消" confirm-text="删除"></confirm>

  <!-- <x-img
  border
  width="300px"
  height="300px"
  src="http://192.168.0.108/shop-wap/./uploadfile/goods/a5/23/3e/c4/57affd1d62e08.jpg">
  </x-img> -->
  <br v-for="i in 50">
  <div slot="bottom">
    <tabbar></tabbar>
  </div>
</view-box>
</template>

<script>

import Tabbar from 'components/tabbar'
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
    Tabbar,
    Toast,
    Switch,
    Textfield,
    XImg,
    XNumber,
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
    }
  },
  ready() {

  }
}
</script>
<style scoped lang="less">@import '../../ui/styles/_vars.less';
@import '../../ui/styles/center.less';

body {
    background-color: #eee;
}

</style>
