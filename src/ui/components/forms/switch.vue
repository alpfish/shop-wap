<template>
<!-- 外层 div 防止多个 label 混乱 -->
<div style="display: inline-flex;">
  <label class="weui_cell_ft" :for="labelId">
    <input class="weui_switch" type="checkbox" v-model="value" :disabled="disabled" :id="labelId">
    <slot>{{ value }}</slot>
  </label>
</div>
</template>

<script>
export default {
  props: {
    // 结果存放变量
    value: {
      type: Boolean,
      required: 'true',
    },
    disabled: Boolean,
  },
  computed: {
    // 继承父组件 list-item 的 labelId,
    labelId() {
      return this.$parent.labelId ? this.$parent.labelId : Math.random().toString(36).substring(3, 8)
    }
  },
  ready() {
    // console.log(this.labelId);
  }
}
</script>

<style lang="less">@import "../../styles/weui/base/fn.less";
@weuiSwitchHeight: 32px;

.weui_switch {
    appearance: none;
    position: relative;
    width: 52px;
    height: @weuiSwitchHeight;
    border: 1px solid #DFDFDF;
    outline: 0;
    border-radius: 16px;
    box-sizing: border-box;
    background: #DFDFDF;
    &:before {
        content: " ";
        position: absolute;
        top: 0;
        left: 0;
        width: 50px;
        height: @weuiSwitchHeight - 2;
        border-radius: 15px;
        background-color: #FDFDFD;
        transition: transform 0.3s;
    }
    &:after {
        content: " ";
        position: absolute;
        top: 0;
        left: 0;
        width: @weuiSwitchHeight - 2;
        height: @weuiSwitchHeight - 2;
        border-radius: 15px;
        background-color: #FFFFFF;
        box-shadow: 0 1px 3px rgba(0, 0, 0, 0.4);
        transition: transform 0.3s;
    }
    &:checked {
        border-color: @switch-checked-border-color;
        background-color: @switch-checked-bg-color;
        &:before {
            transform: scale(0);
        }
        &:after {
            transform: translateX(20px);
        }
    }
}

label {
    font-size: 0;
}
</style>
