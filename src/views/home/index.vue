<!-- Home -->
<template>
<view-box style="background-color: #fff;">
  <list title="我的帐户" item-height="52px">
    <list-item title="帐户" icon="wode" icon-color="red" arrow></list-item>
    <list-item title="左侧" img="http://cn.vuejs.org/images/logo.png"><span slot="right">右侧</span></list-item>
    <list-item title="购物车" icon="gouwuche" icon-color="brand" v-link="{path: 'cart/list'}" arrow></list-item>
    <list-item title="开具发票" icon="chongzhi" ><switch slot="right" :value="sex"></switch></list-item>
    <list-item title="标题">
        <checkbox slot="left" :result="checked" value="选项3"></checkbox>
    </list-item>
    <list-label><list-item title="标题">
        <checkbox slot="left" :result="checked" value="选项2">dd</checkbox>
    </list-item></list-label>
  </list>
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
  },
  data() {
    return {
      data: ['红色', '黄色', '白色'],
      checked: [],
      sex: false,
    }
  },
  methods: {},
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
