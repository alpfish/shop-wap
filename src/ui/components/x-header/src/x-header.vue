<!-- XHeader -->
<template>
<div class="header-bar" :class="{ 'fixed': fixed, 'hairline': bgAlpha === 1 }" :style="styles">
  <div class="left">
    <icon name="back" @click.native="onBack" v-if="back" :size="18" :color="textColor"></icon>
    <icon name="close" @click.native="$emit('on-close')" v-if="close" :size="18" :color="textColor"></icon>
    <slot name="left"></slot>
  </div>
  <div class="title"><slot>{{title}}</slot></div>
  <div class="right">
    <icon name="more-v" @click="$emit('on-more')" v-if="more" :size="18" :color="textColor"></icon>
    <slot name="right"></slot>
  </div>
</div>
</template>

<script>
import { getColor } from '../../../styles/_vars'
import { Icon } from '../../icon'

export default {
  components: {
    Icon,
  },
  props: {
    title: String,
    back: Boolean,
    more: Boolean,
    close: Boolean,
    fixed: Boolean,
    color: {
      type: String,
      default: 'semi'
    },
    bgColor: {
      type: String,
      default: '#FAFAFA' //#FAFAFA
    },
    bgAlpha: {
      type: Number,
      default: 1
    },
  },

  computed: {

    textColor () {
      return getColor(this.color)
    },

    styles () {
      let styles = {}
      styles['color'] = this.textColor
      styles['background-color'] = getColor(this.bgColor, this.bgAlpha)
      return styles
    },

  },

  methods: {
    onBack() {
      window.history.back()
    },
  }
};
</script>

<style lang="less">
@import "../../../styles/_fn.less";

.header-bar {
  position: relative;
  display: flex;
  align-self: flex-start;
  justify-content: flex-start;
  align-items: center;
  font-size: 15px;
  height: @height-header;
  line-height: @height-header;
  z-index: @zindex-header;
  width: 100%;
  .flex-shrink(0);
  &.fixed {
    position: fixed;
    top: 0;
  }
  &.hairline {
    .hairline(bottom, @border-color);
  }
  > .left,
  > .right {
    .flex-shrink(0);
    display: flex;
    justify-content: center;
    align-items: center;
    min-width: 50px;
  }
  > .title {
    flex: 1;
    font-size: 18px;
    font-weight: 600;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    text-align: center;
  }
}
</style>
