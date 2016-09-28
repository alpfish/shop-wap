<template>
<button class="button" :class="buttonClass" :style="style" :disabled="disabled" v-el:button>
  <icon v-if="icon" :name="icon" :size="18"></icon>
  {{text}}<slot></slot>
  <ripple :trigger="$els.button" v-if="!disabled"></ripple>
</button>
</template>

<script>
import Ripple from '../ripple'
import Icon from '../icon/icon'
import {
  color, getColor
} from 'ui/style/_vars'
import {toRGB} from 'ui/utils/converter'

export default {
  components: {
    Icon,
    Ripple
  },
  props: {
    icon: String,
    text: String,
    mini: Boolean,
    fill: Boolean,
    raised: Boolean,
    disabled: Boolean,
    color: {
      type: String,
      default: ''
    }
  },
  computed: {
    buttonClass() {
      return {
        'button-raised': this.raised,
        'button-mini': this.mini,
      }
    },
    style() {
      // TODO getColor
      let bgColor = color[this.color] ? color[this.color] : ''
      let borderColor = this.getRGBA(color['semi'], 0)
      let style = {
        color: color['semi'],
        backgroundColor: 'none',
        border: `1px solid ${borderColor}`,
      }
      // 颜色填充
      if (this.fill  && color[this.color]) {
        style['color'] = color['white']
        style['backgroundColor'] = bgColor
        style['border'] = `0px solid rgba(0, 0, 0, .2)`
      }
      // 浮雕
      if (this.raised) {
        style['border'] = `0px solid rgba(0, 0, 0, .2)`
      }
      // 彩色边框
      if (!this.fill && !this.raised && color[this.color]) {
        style['color'] = color[this.color]
        style['backgroundColor'] = 'none'
        borderColor = this.getRGBA(color[this.color], 0.3)
        style['border'] = `1px solid ${borderColor}`
      }
      // 禁用
      if (this.disabled) {
        // 文字颜色前面已确定
        style['color'] = this.getRGBA(style['color'], 0.6)
      }
      return style
    }
  },
  methods: {
    getRGBA(hex, alpha) {
      hex = /,/.test(hex) ? hex : toRGB(hex.replace('#', '')).join(',')
      return `rgba(${hex}, ${alpha})`
    },
  }

}
</script>

<style lang="less">@import "../../style/_vars.less";
@import "../../style/vue-carbon/_mixins.less";
.button {
    color: @semi;
    height: 44px;
    font-size: 18px;
    border-radius: 2px;
    appearance: none;
    background: none;
    text-decoration: none;
    text-align: center;
    margin: 0;
    padding: 0 3px;
    white-space: nowrap;
    text-overflow: ellipsis;
    text-transform: uppercase;
    position: relative;
    overflow: hidden;
    outline: 0;
    border: none;
    transition-duration: 300ms;
    transform: translate3d(0, 0, 0);
    display: flex;
    justify-content: center;
    align-items: center;
    &:active {
        background: @tap-color;
    }
    .iconfont {
        .flex-shrink(0);
        pointer-events: none;
        margin: 0 4px;
        font-weight: 100;
    }
    .ripple-ink { // 点击水波
        // color: rgba(255,255,255,0.4);
        color: rgba(0,0,0,0.2);
    }
}
.button-raised {
    .depth(1);
    &.active-state,
    html:not(.watch-active-state) &:active {
        .depth(2);
    }
}
.button-mini {
    width: auto;
    height: auto;
    font-size: 14px;
    padding: 4px 0.75em;
    display: inline-block;
}
</style>
