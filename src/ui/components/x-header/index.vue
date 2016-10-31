<!-- XHeader -->
<template>
<div class="header-bar" :class="{ 'fixed': fixed }">
  <div class="left">
    <icon-button icon="back" @click="onBack" v-if="back"></icon-button><span @click="back" v-if="backtext">返回</span>
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
    title: String,
    fixed: Boolean,
    back: Boolean,
    backtext: Boolean,
  },
  methods: {
    onBack() {
      window.history.back()
    }
  }
};
</script>

<style lang="less">
@import "../../styles/_vars.less";
@import "../../styles/vue-carbon/_mixins.less";

@header-text-color: @black;

.header-bar {
  display: flex;
  align-self: flex-start;
  justify-content: flex-start;
  align-items: center;
  font-size: 15*2/75rem;
  color: @header-text-color;
  background-color: @bg-header; //#FAFAFA
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
  // .button {
  //   background: none;
  //   font-size: 14*2/75rem;
  //   height: @height-header;
  //   color: lighten(@header-text-color, 10%);
  // }
  .iconfont {
    color: lighten(@header-text-color, 10%);
    font-size: 18*2/75rem;
  }
}
</style>
