<!-- Dialog 代码采用于 vux -->
<template>
  <div v-to-body class="weui_dialog_alert" @touchmove="!this.scroll && $event.preventDefault()">
    <div class="weui_mask" @click="hideOnBlur && (show = false)" v-show="show" :transition="maskTransition"></div>
    <div class="weui_dialog" v-show="show" :transition="dialogTransition">
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      uuid: null
    }
  },
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
  },

  directives: {
    // 准确定位与防止被遮盖，在ready()中添加，指令解绑中移除方才有效！
    // * 在 template 中添加 v-to-body
    toBody: {
      // 2. 移除添加到 body 中的 el，防止(v-if/v-show)重复添加导致内存崩溃
      unbind: function () {
        this.el.remove()
      }
    }
  },
  ready() {
    // 准确定位与防止被遮盖，在ready()中添加，指令解绑中移除方才有效！
    // 1. 整个 Dialog 移至 body ，防止(scroll/pullup/pulldown)或在子组件中被覆盖出现的BUG
    document.body.appendChild(this.$el)
  }
}
</script>

<style lang="less">
@import "../../styles/index.less";
@import '../../styles/transition.less';
@import '../../styles/weui/widget/weui_tips/weui_mask';
@import '../../styles/weui/widget/weui_tips/weui_dialog';

.weui_mask {
    z-index: @zindex-mask!important;
}

.weui_dialog {
    width: 80%;
    top: 50%;
    left: 50%;
    border-radius: 3*2px;
    z-index: @zindex-mask!important;
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
