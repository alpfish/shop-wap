<!-- XHeader -->
<template>
<div class="header-bar" :class="{ 'fixed': fixed }">
  <div class="left">
    <icon-button icon="back" @click="back" v-if="back || backtext"></icon-button><span @click="back" v-if="backtext">返回</span>
    <slot name="left"></slot>
  </div>
  <div class="title"  v-text="title"><slot></slot></div>
  <div class="right">
    <slot name="right"></slot>
  </div>
</div>
</template>

<script>
import { Icon, IconButton } from '../icon'

export default {
  components: {
    Icon,
    IconButton,
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
@import "../../styles/_vars.less";
@import "../../styles/vue-carbon/_mixins.less";

@header-text-color: @semi;

.header-bar {
  display: flex;
  align-self: flex-start;
  justify-content: flex-start;
  align-items: center;
  font-size: 14px;
  color: @header-text-color;
  background-color: lighten(@bg-header, 1%);
  height: @height-header;
  line-height: @height-header;
  z-index: @zindex-header;
  width: 100%;
  box-shadow: 0 1px 5px lighten(@gray, 20%);
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
    height: @height-header;
    color: lighten(@header-text-color, 10%);
  }
  .iconfont {
    color: lighten(@header-text-color, 10%);
    font-size: 18px;
  }
}
</style>
