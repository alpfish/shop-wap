<!-- 订单(全场)促销 -->
<!-- 1. 自动计算，不支持选择 -->
<!-- 2. 这里只负责计算和显示订单促销结果 -->
<!-- 3. 可查看全部订单促销 -->
<template>
  <list>
    <!-- <list-item title="全场优惠" line-space="0" arrow></list-item> -->
    <list-item line-space="0" >
      <tag slot="left" color="red" :size="12">全场</tag>
      <span class="prom-info">已享满100减10元　再凑15.50元可享满200减30元</span>
    </list-item>
    <list-item>
      <tag slot="left" color="red" :size="12">全场</tag>
      <span class="prom-info">已享满100送</span>
    </list-item>
  </list>
</template>

<script>
import { List, ListItem, Tag, } from 'ui/components'

export default {
  props: {
    // 为保证结算数据的唯一来源，金额由调用的父组件提供
    amount: Number,
  },
  components: {
    List,
    ListItem,
    Tag,
  },
  computed: {

  },
}
</script>
<style scoped lang="less">
@import "../../ui/styles/_vars.less";
@import "../../ui/styles/_mixins.less";

.prom-info {
  margin-left: 10px;
  font-size: 12px;
  overflow-x: auto;
  white-space: nowrap;
}
</style>
