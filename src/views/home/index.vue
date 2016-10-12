<!-- Home -->
<template>
<view-box style="background-color: #fff;">
  <list title="我的帐户" item-height="45px">
    <list-item title="帐户" subtitle="子标题中" icon="wode" icon-color="red" arrow></list-item>
    <list-item title="左侧" img="http://cn.vuejs.org/images/logo.png"><span slot="right">右侧</span></list-item>
    <list-item title="购物车" icon="gouwuche" icon-color="brand" v-link="{path: 'cart/list'}" arrow></list-item>
    <list-label><list-item title="开具发票" icon="chongzhi" ><switch slot="right" :value.sync="sex"></switch></list-item></list-label>
    <list-label><list-item title="红色"><checkbox slot="left" :value.sync="checked" option="红色">红色</checkbox></list-item></list-label>
    <list-label><list-item title="黄色"><checkbox slot="left" :value.sync="checked" option="黄色"></checkbox></list-item></list-label>
    <list-item title="数字选择器"><x-number slot="right" :value.sync="num" :min="1"></x-number></list-item>
  </list>
<span class="text">文字文字文</span>
  <br v-for="i in 10">
  <div slot="bottom">
    <tabbar></tabbar>
  </div>
</view-box>
</template>

<script>
import Tabbar from 'components/tabbar'
import {
  Box,
  BoxItem,
  Checkbox,
  ViewBox,
  Button,
  Icon,
  List,
  ListItem,
  ListLabel,
  Switch,
  Textfield,
  XNumber,
} from 'ui/components'

export default {
  components: {
    Box,
    BoxItem,
    Checkbox,
    ViewBox,
    Button,
    Icon,
    List,
    ListItem,
    ListLabel,
    Tabbar,
    Switch,
    Textfield,
    XNumber,
  },
  data() {
    return {
      data: ['红色', '黄色', '白色'],
      checked: [],
      sex: false,
      num: -1,
    }
  },
  ready() {
  }
}
</script>
<style scoped lang="less">@import '../../ui/styles/_vars.less';
@import '../../ui/styles/center.less';

.text {
  font-size: 2rem;
}
body {
    background-color: #eee;
}

</style>
