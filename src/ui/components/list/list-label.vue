<template>
<!-- 外层 div 防止多个 label 混乱 -->
<div class="list-item-wrap">
  <label :for="labelId" style="display: block;">
    <slot></slot>
  </label>
</div>
</template>

<script>
export default {
  data() {
    return {
      // 需 ListItem 继承 labelID
      labelId: Math.random().toString(36).substring(3, 8),

      // 继承 List 组件中所有 ListItem 相关属性， 到 ListItem
      gutter: this.$parent.gutter,
      itemHeight: this.$parent.itemHeight,
      itemPadding: this.$parent.itemPadding,
      itemLine: this.$parent.itemLine,
      itemLineSpace: this.$parent.itemLineSpace,
    }
  },
}
</script>
