<!-- XHeader -->
<template>
<div class="header-bar" :class="{ 'fixed': fixed }">
  <div class="left">
    <icon name="back" :size="18" @click="back" v-if="back || backtext"></icon><span @click="back" v-if="backtext">返回</span>
    <slot name="left"></slot>
  </div>
  <div class="title"  v-text="title"><slot></slot></div>
  <div class="right">
    <slot name="right"></slot>
  </div>
</div>
</template>

<script>
import Icon from '../icon'

export default {
  components: {
    Icon,
  },
  props: {
    title: {
      type: String,
      default: ''
    },
    fixed: {
      type: Boolean,
      default: false,
    },
    back: {
      type: Boolean,
      default: false,
    },
    backtext: {
      type: Boolean,
      default: false,
    }
  },
  methods: {
    back() {
      window.history.back()
    }
  }
};
</script>

<style lang="less">
@import "../../style/_vars.less";
@import "../../style/vue-carbon/_mixins.less";

.header-bar {
  display: flex;
  align-self: flex-start;
  justify-content: flex-start;
  align-items: center;
  font-size: 14px;
  color: @white;
  // color: @black;
  background-color: lighten(@gray, 1%);
  // background-color: lighten(@gray-light, 2%);
  height: @header-height;
  line-height: @header-height;
  z-index: @zindex-header;
  width: 100%;
  box-shadow: 0px 1px 5px lighten(@gray-light, 15%);
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
    color: rgba(255, 255, 255, .9);
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
  .button {
    background: none;
    font-size: 14px;
    height: @header-height;
    color: lighten(@white, 10%);
    // color: lighten(@black, 10%);
  }
}
</style>
