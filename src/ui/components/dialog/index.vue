<!-- Dialog 代码采用于 vux -->
<template>
  <div class="weui_dialog_alert" @touchmove="!this.scroll && $event.preventDefault()">
    <div class="weui_mask" @click="hideOnBlur && (show = false)" v-show="show" :transition="maskTransition"></div>
    <div class="weui_dialog" v-show="show" :transition="dialogTransition">
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    show: {
      type: Boolean,
      default: false
    },
    maskTransition: {
      type: String,
      default: 'vux-fade'
    },
    dialogTransition: {
      type: String,
      default: 'vux-dialog'
    },
    hideOnBlur: Boolean,
    scroll: {
      type: Boolean,
      default: true
    }
  },
  watch: {
    show (val) {
      this.$emit(val ? 'on-show' : 'on-hide')
    }
  }
}
</script>

<style lang="less">
@import "../../styles/index.less";
@import '../../styles/transition.less';
@import '../../styles/weui/widget/weui_tips/weui_mask';
@import '../../styles/weui/widget/weui_tips/weui_dialog';

.weui_dialog {
    width: 80%;
    top: 50%;
    left: 50%;
    border-radius: 3*2px;
}

.weui_dialog_title {
    color: #000;
    font-size: 17*2px;
}

.weui_dialog_bd {
    padding: 0 20*2px;
    font-size: 15*2px;
    color: @globalTextColor;
}

.weui_dialog_ft {
    line-height: 42*2px;
    margin-top: 20*2px;
    font-size: 17*2px;
    border-top: 1px solid @weuiDialogLineColor;
    .weui_dialog_confirm & {
        a {
            border-left: 1px solid @weuiDialogLineColor;
        }
    }
}

.weui_btn_dialog {
    &.default {
        color: @dialog-button-text-default-color;
    }
    &.primary {
        color: darken(@red, 0%);//@dialog-button-text-primary-color;
    }
}

</style>
