<!-- Toast 代码采用于 vux -->
<template>
  <div class="vux-toast">
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
  }
}
</script>

<style lang="less">
@import '../../styles/transition.less';
@import '../../styles/weui/widget/weui_tips/weui_mask';
@import '../../styles/weui/icon/weui_icon_font';
@import '../../styles/weui/widget/weui_tips/weui_toast';

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
