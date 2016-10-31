<!-- 强大的列表组件, 适用于 link form media 等多种列表 -->
<template>
<div>
  <div class="list-title" v-if="title" v-html="title"></div>
  <ul class="list" :class="{'list-line': line}" :style="styles">
    <slot></slot>
  </ul>
</div>
</template>
<script>
export default {

  props: {
    title: String,
    line: Boolean,
    bgcolor: String,
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
