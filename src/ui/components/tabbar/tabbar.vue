<template>
<div class="weui_tabbar">
  <slot></slot>
</div>
</template>

<style lang="less">
@import "../../styles/index.less";

.weui_tabbar {
    display: flex;
    position: absolute;
    z-index: @zindex-tabbar;
    bottom: 0;
    width: 100%;
    height: 110/75rem;
    max-height: 110/75rem;
    background-color: @bg-tabbar;
    &:before {
        .setTopLine(@gray-light-extra);
    }
}
.weui_tabbar_item {
    display: block;
    flex: 1;
    margin: 0;
    padding: 0;
    padding-top: 3*2/75rem;

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
    max-width: 24*2/75rem;
    max-height: 24*2/75rem;
    img {
        display: block;
        width: 100%;
        height: 100%;
    }
    & + .weui_tabbar_label {
        margin-top: 9*2/75rem;
        margin-bottom:  5*2/75rem;
    }
}

.weui_tabbar_label {
    font-size: 14*2/75rem;
    line-height: 14*2/75rem;
    height: 14*2/75rem;
    color: @gray; // alp
}

.weui_tabbar_icon {
    position: relative;
}
.weui_tabbar_icon > sup {
    position: absolute;
    top: -3px;
    left: 100%;
    transform: translateX(-50%);
    z-index: @zindex-tabbar + 1;
}
</style>
