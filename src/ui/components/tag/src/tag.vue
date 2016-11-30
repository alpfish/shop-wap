<template>
  <span class="tag" :style="styles">
    <slot></slot>
  </span>
</template>

<script>
import { getColor } from '../../../styles/_vars'

export default {
  props: {
    color: String,
    size: Number,
    radius: Number,
  },

  computed: {
    styles() {
      let color = getColor(this.color || 'red')
      let size = this.size || 12
      return {
        color: color,
        borderColor: color,
        borderRadius: `${this.radius || 3}px`,
        fontSize: `${size}px`,
        lineHeight: `${size + 4}px`,
      }
    }
  },
}
</script>

<style lang="less">
@import "../../../styles/_vars.less";
@import "../../../styles/_mixins.less";

.tag {
  // vertical-align 是 inline-block 依赖性元素
  display: inline-block;
  vertical-align: middle;
  position: relative;
  padding: 0px 4px;
  border: 1px solid @red;
  // .onePxBorder(@red, 3px);
  // color: @red;
  // font-size: 12px;
  // line-height: 16px;
  // border-radius: 3px;
}
</style>
