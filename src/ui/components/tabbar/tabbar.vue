<template>
<div class="weui_tabbar">
  <slot></slot>
</div>
</template>

<script>
export default {
  props: {
    iconClass: String
  }
}
</script>

<style lang="less">
@import "../../styles/weui/base/fn.less";

.weui_tabbar {
    display: flex;
    position: absolute;
    z-index: @zindex-tabbar;
    bottom: 0;
    width: 100%;
    background-color: @bg-tabbar;
    &:before {
        .setTopLine(@gray);
    }
}
.weui_tabbar_item {
    display: block;
    flex: 1;
    padding: 7px 0;
    color: @gray; // alp
    text-align: center; // alp
    -webkit-tap-highlight-color: transparent;

    .active {
        color: @brand;
    }
}

.weui_tabbar_icon {
    margin: 0 auto;
    padding: 0 auto;
    max-width: 24px;
    max-height: 24px;
    img {
        display: block;
        width: 100%;
        height: 100%;
    }
    & + .weui_tabbar_label {
        margin-top: 2px;
        margin-bottom: 0;
    }
}

.weui_tabbar_label {
    font-size: 12px;
    line-height: 12px;
}

.weui_tabbar_icon {
    position: relative;
}
.weui_tabbar_icon > sup {
    position: absolute;
    top: -5px;
    left: 100%;
    transform: translateX(-50%);
    z-index: @zindex-tabbar + 1;
}
</style>
