<template>
  <button :id="id" class="x-button" :class="buttonClass" :style="style" :disabled="disabled">
    <icon v-if="icon" :name="icon" :size="18"></icon>
    <slot>{{text}}</slot>
  </button>
</template>

<script>
import { Icon } from '../../icon/index.js'
import {
  getColor
} from 'ui/styles/_vars'

export default {
  components: {
    Icon
  },

  props: {
    color: String,
    fill: Boolean,
    mini: Boolean,
    disabled: Boolean,
    icon: String,
    text: String,
  },

  computed: {
    buttonClass() {
      return {
        'button-mini': this.mini,
      }
    },
    style() {
      let color = this.color || 'semi'
      let style = {
        backgroundColor: 'none'
      }
      // 修改默认边框颜色, IE浏览器将 insertRule 改为 addRule
      document.styleSheets[0].insertRule(`#${this.id}::before{border-color: ${getColor(color)}!important;}` ,0)

      // 颜色填充
      if (this.fill && this.color) {
        style['color'] = '#FFF'
        style['backgroundColor'] = getColor(color)
        // 激活状态
        document.styleSheets[0].insertRule(`#${this.id}:active{background-color: ${getColor(color, 0.6)}!important;}` ,0)
      }

      // 彩色边框
      if (!this.fill && this.color) {
        style['color'] =  getColor(color)
        style['backgroundColor'] = 'none'
      }

      // 禁用状态
      if (this.disabled) {
        style['color'] =  getColor(this.fill && this.color ? '#ffffff' : color, 0.5)
        if (this.fill) {
          style['backgroundColor'] = getColor(this.color, 0.6)
        }
      }
      return style
    }
  },

  data() {
    return {
      id: 'x-button-' + Math.random().toString(36).substring(3, 8)
    }
  },
}
</script>

<style lang="less">
@import "../../../styles/_fn.less";

button, input {
  &.x-button {
      position: relative;
      display: block;
      margin-left: auto;
      margin-right: auto;
      padding-left: 15px;
      padding-right: 15px;
      width: 100%;
      color: @semi;
      font-size: 18px;
      line-height: 45px;
      text-align: center;
      text-decoration: none;
      appearance: none;
      background: none;
      white-space: nowrap;
      text-overflow: ellipsis;
      overflow: hidden;
      outline: 0;
      transition-duration: 300ms;
      transform: translate3d(0, 0, 0);
      border: none;
      border-radius: 4px;
      .setTapColor();
      // 1px 边框
      &:before {
        content: " ";
        width: 200%;
        height: 200%;
        position: absolute;
        top: 0;
        left: 0;
        border: 1px solid @semi;
        transform: scale(.5);
        transform-origin: 0 0;
        box-sizing: border-box;
        border-radius: 8px; // 2倍
      }
      &:active {
          background-color: @tap-color;
      }

      &.button-mini {
          width: auto;
          line-height: 28px;
          font-size: 12px;
          padding: 0 .75em;
          display: inline-block;
      }
  }
}

/*gap between btn*/
.x-button + .x-button {
    margin-top: 15px;
}
</style>
