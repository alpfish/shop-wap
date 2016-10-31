<!-- XHeader -->
<template>
<div class="x-img-wrap" :class="{border: border}" :style="wrapStyle">
  <img :src="src"></img>
  <div v-if="tag" class="x-img-tag" :style="tagStyle" v-text="tag"></div>
</div>
</template>

<script>
import {getColor} from 'ui/styles/_vars'
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
      type: String,
      default: `${6/75}rem`,
    },
  },
  computed: {
    wrapStyle() {
      let style = {}
      style['width'] = this.width
      style['height'] = this.height
      style['borderRadius'] = this.radius
      return style
    },
    tagStyle() {
      let style = {}
      style['backgroundColor'] = getColor(this.tagColor, 0.8)
      return style
    },
  },
  methods: {

  }
};
</script>

<style lang="less">
@import "../../styles/index.less";
.x-img-wrap {
  overflow: hidden;
  position: relative;
  // top: 50%;
  // transform: translateY(-50%); // 目的是让图片垂直居中，但容器和图片都会上移50%，使用 flex 应该可以达到同样的效果
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
    // height: 50/75rem;
    line-height: 46/75rem;
    font-size: 26/75rem;
    color: #fff;
    text-align: center;
    background-color: rgba(51,51,51,.5);
  }
}
.border {
  border: 1px solid lighten(@border-color, 5%);
}

</style>
