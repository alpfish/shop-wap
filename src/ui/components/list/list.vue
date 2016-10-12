<!-- 强大的列表组件, 适用于 link form media 等多种列表 -->
<template>
<div>
  <div class="list-title" v-if="title"  v-html="title"></div>
  <div class="list-line" v-show="line"></div>
  <div class="list" :style="styles">
    <slot></slot>
  </div>
  <div class="list-line" v-show="line"></div>
</div>
</template>
<script>
export default {

  props: {
    // 标题
    title: String,
    // 标题颜色
    titleColor: String,
    // 背景色
    bgcolor: String,
    // 显示首尾分隔线
    line: {
      type: Boolean,
      default: true
    },
    // 显示子元素分隔线
    itemLine: {
      type: Boolean,
      default: true
    },
    // 子元素分隔线右边空白宽度
    itemLineSpace: {
      type: [Number, String],
      default: '0 0 0 15px'
    },
    // 统一设置子元素高度, (子元素中默认设置44px)
    itemHeight: [Number, String],
    // 子元素 padding, (子元素中默认设置为 '0 15px')
    itemPadding: String,
    // 设置各个子元素间的间距(槽距)
    gutter: [Number, String],
  },
  computed: {
    styles() {
      let styles = {}
      if (this.bgcolor) {
        styles['backgroundColor'] = this.bgcolor
      }
      return styles
    }
  }
}
</script>

<style lang="less">
@import "./style.less";
</style>
