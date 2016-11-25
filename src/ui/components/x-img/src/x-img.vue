<!-- XHeader -->
<template>
<div class="x-img-wrap" :id="id" :class="{border: border}" :style="wrapStyle">
  <img :src="src"></img>
  <div v-if="tag" class="x-img-tag" :style="tagStyle" v-text="tag"></div>
</div>
</template>

<script>
import {getColor} from '../../../styles/_vars'

export default {
  components: {
  },
  props: {
    link: [String, Object],
    src: String,
    bgsrc: String,
    width: {
      type: [String, Number],
      default: `${100/75}rem`,
    },
    height: {
      type: [String, Number],
      default: `${100/75}rem`,
    },
    tag: String,
    tagColor: {
      type: String,
      default: 'red',
    },
    border: Boolean,
    radius: {
      type: Number,
      default: 10,
    },
  },
  computed: {
    wrapStyle() {
      let style = {}
      style['width'] = this.width
      style['height'] = this.height
      style['borderRadius'] = this.radius + 'px'
      document.styleSheets[0].insertRule(`#${this.id}::before{border-radius: ${this.radius*2}px!important;}` ,0)

      return style
    },
    tagStyle() {
      let style = {}
      style['backgroundColor'] = getColor(this.tagColor, 0.75)
      style['borderRadius'] = `0 0 ${this.radius}px ${this.radius}px`
      return style
    },
  },

  data() {
    return {
      id: 'x-img-' + Math.random().toString(36).substring(3, 8)
    }
  },
}
</script>

<style lang="less">
@import "../../../styles/_fn.less";
.x-img-wrap {
  overflow: hidden;
  position: relative;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  background-color: #f4f4f4;
  img {
    width: 100%;
    height: auto;
  }
  .x-img-tag {
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    line-height: 20px;
    font-size: 12px;
    color: @white;
    text-align: center;
    border-width: 0;
    background-color: rgba(51,51,51,.6);
  }
}
.border {
  &:before {
    content: " ";
    width: 200%;
    height: 200%;
    position: absolute;
    top: 0;
    left: 0;
    border: 1px solid @border-color;
    transform: scale(.5);
    transform-origin: 0 0;
    box-sizing: border-box;
  }
}

</style>
