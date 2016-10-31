<!-- Toast 代码采用于 vux -->
<template>
  <div v-to-body class="vux-toast">
    <div class="weui_mask_transparent" v-show="show"></div>
      <div class="weui_toast" :style="{width: width}" :class="toastClass" v-show="show" :transition="transition">
        <i class="weui_icon_toast" v-show="type !== 'text'"></i>
        <p class="weui_toast_content" v-if="text" v-html="text"></p>
        <p class="weui_toast_content" v-else><slot></slot></p>
      </div>
  </div>
</template>

<script>
export default {
  props: {
    show: {
      type: Boolean,
      default: true
    },
    time: {
      type: Number,
      default: 2000
    },
    type: {
      type: String,
      default: 'success'
    },
    transition: {
      type: String,
      default: 'vux-fade'
    },
    width: {
      type: String,
      default: 'auto'
    },
    text: String
  },

  computed: {
    toastClass () {
      return {
        'weui_toast_forbidden': this.type === 'warn',
        'weui_toast_cancel': this.type === 'cancel',
        'weui_toast_success': this.type === 'success',
        'weui_toast_text': this.type === 'text'
      }
    }
  },

  watch: {
    show (val) {
      if (val) {
        clearTimeout(this.timeout)
        this.timeout = setTimeout(() => {
          this.show = false
          this.$emit('on-hide')
        }, this.time)
      }
    }
  },

  directives: {
    // 准确定位与防止被遮盖，在ready()中添加，指令解绑中移除方才有效！
    // * 在 template 中添加 v-to-body
    toBody: {
      // 2. 移除添加到 body 中的 el，防止(v-if/v-show)重复添加导致内存崩溃
      unbind: function () {
        this.el.remove() //注意指令中使用 el 或 this.vm.$el 而不是直接使用 this.$el
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
@import '../../styles/_vars.less';
@import '../../styles/transition.less';
@import '../../styles/weui/widget/weui_tips/weui_mask';
@import '../../styles/weui/icon/weui_icon_font';
@import '../../styles/weui/widget/weui_tips/weui_toast';

.weui_mask_transparent {
    z-index: @zindex-mask;
}

.weui_toast {
  transform: translateX(-50%);
  margin-left: 0!important;
  min-width: 240px;
  min-height: 240px;
  // max-height: 240px;
  top: 35%;
  left: 50%;
  margin-left: -3.8em;
  background: rgba(40, 40, 40, 0.75);
  border-radius: 5*2px;
  z-index: @zindex-toast@zindex-mask!important;;
}

.weui_icon_toast {
    margin: 22*2px 0 0;
    &:before {
        font-size: 55*2px;
    }
}

.weui_toast_content {
    color: #fff;
    font-size: 32px;
    margin: 0 0 22*2px;
    padding: 0 22*2px;
}

.weui_toast_forbidden {
  color: #F76260;
}
.weui_toast.weui_toast_text{
  min-height: 0;
}
.weui_toast_text .weui_toast_content {
  margin: 0;
  padding-top: 5*2px;
  padding-bottom: 5*2px;
  border-radius: 15*2px;
}
.weui_toast_success .weui_icon_toast:before {
  content: "\EA08";
}
.weui_toast_cancel .weui_icon_toast:before {
  content: "\EA0D";
}
.weui_toast_forbidden .weui_icon_toast:before {
  content: "\EA0B";
  color: #F76260;
}
</style>
