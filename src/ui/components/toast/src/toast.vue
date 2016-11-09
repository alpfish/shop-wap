<template>
  <div v-show="visible">
    <div class="weui-mask_transparent"></div>
    <div class="weui-toast" :style="styles">
        <icon v-if="icon" :name="icon" size="55px" :color="iconColor"></icon>
        <p class="weui-toast__content" :class="{'toast-text-no-icon': !icon}">{{ message }}</p>
    </div>
  </div>
</template>

<style scoped lang="less">
@import '../../../styles/weui/widget/weui-tips/weui-mask.less';
@import '../../../styles/weui/widget/weui-tips/weui-toast.less';

  // 样式覆盖
  .weui-toast {
    top: 35%;
    max-width: 80%;
    // transform: translate(-50%, -50%); // UC不支持，使用计算负值 margin-left 居中对齐

    .toast-text-no-icon {
      margin: 15px;
    }
  }
</style>

<script type="text/babel">
  import { Icon } from '../../icon/index.js'

  export default {
    components: {
      Icon
    },
    props: {
      message: {
        type: String,
        default: '操作成功'
      },
      icon: {
        type: String,
        default: ''
      },
      iconColor: String,
    },

    data() {
      return {
        visible: false
      };
    },

    computed: {
      styles () {
        let styles = {}
        if (!this.icon) {
          let width = (this.message.length + 2) * 16
          let maxWidth = document.body.clientWidth * 0.8
          width =  width < maxWidth ? width : maxWidth
          styles['width'] = `${width}px`
          styles['margin-left'] = `${-width/2}px` // 替代 transform 居中
          styles['min-height'] = 0 // 覆盖 weui min-height
        }
        return styles
      },

    },

  };
</script>
