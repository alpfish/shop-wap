<template>
  <div class="weui-tabbar">
    <slot></slot>
  </div>
</template>

<style lang="less">
@import "../../../styles/_fn.less";
@import "../../../styles/weui/widget/weui-tab/tabbar.less";

.weui-tabbar {
  // 兼容UC
  display: -webkit-box;
}
.weui-tabbar__item {
  // 兼容UC
  -webkit-box-flex: 1;
  -moz-box-flex: 1;
  -ms-flex: 1;
  &.weui-bar__item_on {
      .weui-tabbar__icon, .weui-tabbar__icon > i, .weui-tabbar__label {
          color: @brand;
      }
  }
}

.weui-tabbar__icon {
  position: relative;
}

.weui-tabbar__icon > sup {
  position: absolute;
  top: -4px;
  left: 100%;
  transform: translateX(-50%);
  z-index: 101;
}
</style>
