<!-- Home -->
<template>
<view-box style="background-color: #fff;">
  <x-header slot="header" title="添加地址"></x-header>
  <!-- <list>
    <list-item :line="false"><textfield placeholder="姓名"></textfield></list-item>
    <list-item :line="false"><textfield placeholder="手机号码"></textfield></list-item>
    <list-item :line="false"><textfield placeholder="省、市、县 : 四川 绵阳 三台"></textfield></list-item>
    <list-item :line="false"><textfield placeholder="区域位置"></textfield></list-item>
    <list-item :line="false"><textfield placeholder="详细地址 , 填写街道、小区、楼牌号等"></textfield></list-item>
  </list> -->

  <textfield placeholder="姓名" :value.sync="name"></textfield>
  <textfield placeholder="手机号码" :value.sync="mobile" type="tel"></textfield>
  <!-- <textfield placeholder="省、市、县 : 四川 绵阳 三台"></textfield> -->
  <textfield placeholder="城市位置"></textfield>
  <textfield placeholder="详细地址 , 如街道、小区、楼牌号等"  :value.sync="address"></textfield>

  <!-- <textfield label="姓名" label-float></textfield>
  <textfield label="手机号码" label-float></textfield>
  <textfield label="区域位置" label-float></textfield>
  <textfield placeholder="详细地址 , 如街道、小区、楼牌号等"></textfield> -->

  <!-- <textfield type='password' icon="mima" label="密码" label-float></textfield> -->


  <list>
    <list-item :line="false"><checkbox :value.sync="checked" option="设为默认地址" label="设为默认地址"></checkbox></list-item>
  </list>

</view-box>
</template>

<script>
import {
  ViewBox,
  Checkbox,
  List,
  ListItem,
  Textfield,
  XHeader,
} from 'ui/components'

export default {
  components: {
    ViewBox,
    Checkbox,
    List,
    ListItem,
    Textfield,
    XHeader,
  },
  data() {
    return {
      name: '',
      mobile: '',
      city: '',
      address: '',
      checked: true
    }
  },
  methods: {

  },
  ready() {
  }
}
</script>
<style scoped lang="less">
@import '../../ui/styles/_vars.less';

</style>
