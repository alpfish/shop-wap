<template>
  <div class="header-bar"
    :class="{ 'fixed': fixed }">
    <div class="left">
      <slot name="left"></slot>
    </div>
    <div class="title"  v-text="title"></div>
    <div class="right">
      <slot name="right"></slot>
    </div>
  </div>
</template>

<script>
/**
 * headerBar
 *
 * @module components/ui/bars/headerBar
 * @desc 顶部导航, 配合 content 可以固定
 * @param {string} [title] - 标题
 * @param {slot} [left] - 显示在左侧区域
 * @param {slot} [right] - 显示在右侧区域
 *
 * @example
 * <header-bar title="我是标题" fixed>
 *   <button slot="left" icon="back" @click="handleBack">返回</button>
 *   <button slot="right" icon="more"></button>
 * </header-bar>
 */
export default {
  name: 'mt-header',
  props: {
    title: String
  }
};
</script>

<style lang="less">
@import "../utils/_vars.less";
@import "../utils/_mixins.less";

.header-bar {
  display: flex;
  align-self: flex-start;
  justify-content: flex-start;
  align-items: center;
  color: #FFF;
  background-color: @barcolor;
  font-size: 20px;
  height: @header-height;
  width: 100%;
  padding: 0 8px;
  .flex-shrink(0);
  > .left,
  > .right{
    .flex-shrink(0);
    display: flex;
    justify-content: flex-start;
    align-items: center;
  }
  > .title{
    flex: 1;
    line-height: @header-height;
    overflow: hidden;
    text-overflow: ellipsis;
    padding-left: 16px;
    padding-right: 16px;
    white-space: nowrap;
  }
  .button {
    font-size: 18px;
    background: none;
    height: 44px;
    line-height: 44px;
    color: #FFF;
    .ripple-ink{
      color: rgba(255, 255, 255, .3);
    }
  }
  .icon-button {
    background: none;
    width: 44px;
    height: 44px;
    color: #FFF;
    .ripple-ink{
      color: rgba(255, 255, 255, .3);
    }
  }
}
</style>
