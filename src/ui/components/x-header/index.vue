<!-- XHeader -->
<template>
<div class="header-bar" :class="{ 'fixed': fixed }" :style="styles">
  <div class="left">
    <icon name="back" @click="onBack" v-if="back" :size="38" :color="textColor"></icon>
    <icon name="close" @click="$emit('on-close')" v-if="close" :size="38" :color="textColor"></icon>
    <slot name="left"></slot>
  </div>
  <div class="title"  v-text="title"><slot></slot></div>
  <div class="right">
    <icon name="more-v" @click="$emit('on-more')" v-if="more" :size="38" :color="textColor"></icon>
    <slot name="right"></slot>
  </div>
</div>
</template>

<script>
import { getColor } from 'ui/styles/_vars'
import { Icon } from '../icon'

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
      if (this.bgColor) {
        styles['border'] = 'none'
      }

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
@import "../../styles/_vars.less";
@import "../../styles/vue-carbon/_mixins.less";

.header-bar {
  display: flex;
  align-self: flex-start;
  justify-content: flex-start;
  align-items: center;
  font-size: 15*2/75rem;
  // color: @header-text-color;
  // background-color: @bg-header; //#FAFAFA
  height: @height-header;
  line-height: @height-header;
  z-index: @zindex-header;
  width: 100%;
  border-bottom: 1px solid @border-color;
  // box-shadow: 0 1px 5*2/75rem lighten(@gray, 20%);
  .flex-shrink(0);
  &.fixed {
    position: fixed;
    top: 0;
  }
  > .left,
  > .right {
    .flex-shrink(0);
    display: flex;
    justify-content: center;
    align-items: center;
    min-width: 50*2/75rem;
  }
  > .title {
    flex: 1;
    font-size: 18*2/75rem;
    font-weight: 600;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    text-align: center;
  }
}
</style>
