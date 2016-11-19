<template>
<div>
  <div class="weui-cells__title" v-if="title">{{title}}</div>
  <ul class="weui-cells">
    <slot></slot>
  </ul>
  <div class="weui-cells__tips"><slot name="tips"></slot></div>
</div>
</template>

<script>
  export default {
    props: {
      title: String,
    }
  }
</script>

<style lang="less">
@import "../../../styles/_vars.less";
@import "../../../styles/weui/widget/weui-cell/weui-form.less";
@import "../../../styles/weui/widget/weui-cell/weui-cell_global.less";
@import "../../../styles/weui/widget/weui-cell/weui-access.less";
@import "../../../styles/weui/icon/weui-icon_font.less";

</style>
