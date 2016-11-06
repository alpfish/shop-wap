<template>
<button class="x-button" :class="buttonClass" :style="style" :disabled="disabled" v-el:button>
  <icon v-if="icon" :name="icon" :size="18*2"></icon>
  <slot>{{text}}</slot>
  <ripple :trigger="$els.button" v-if="!disabled"></ripple>
</button>
</template>

<script>
import Ripple from '../ripple'
import Icon from '../icon/icon'
import {
  getColor
} from 'ui/styles/_vars'

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
    color: String,
  },
  computed: {
    buttonClass() {
      return {
        'button-raised': this.raised,
        'button-mini': this.mini,
      }
    },
    style() {
      let bgColor = getColor(this.color)
      let borderColor = getColor('semi', 0)
      let style = {
        color: getColor('semi'),
        backgroundColor: 'none',
        border: `1px solid ${borderColor}`,
      }
      // 颜色填充
      if (this.fill  && getColor(this.color)) {
        style['color'] = getColor('white')
        style['backgroundColor'] = bgColor
        style['border'] = `0px solid rgba(0, 0, 0, .2)`
      }
      // 浮雕
      if (this.raised) {
        style['border'] = `0px solid rgba(0, 0, 0, .2)`
      }
      // 彩色边框
      if (!this.fill && !this.raised && getColor(this.color)) {
        style['color'] =  getColor(this.color)
        style['backgroundColor'] = 'none'
        style['border'] = `1px solid ${getColor(this.color, 1)}`
        if (this.disabled) {
          style['border'] = `1px solid ${getColor(this.color, 0.3)}`
        }
      }
      // 禁用
      if (this.disabled) {
        // 文字颜色前面已确定
        style['color'] =  getColor(style['color'], 0.6)
        if (this.fill) {
          style['backgroundColor'] = getColor(this.color, 0.8)
        }
      }
      return style
    }
  },
}
</script>

<style lang="less">
@import "../../styles/_vars.less";
@import "../../styles/vue-carbon/_mixins.less";
button, input {
  &.x-button {
      position: relative;
      display: block;
      margin-left: auto;
      margin-right: auto;
      padding-left: 28px;
      padding-right: 28px;
      width: 100%;
      color: @semi;
      font-size: 18*2px;
      line-height: 44*2px;
      text-align: center;
      text-decoration: none;
      appearance: none;
      background: none;
      white-space: nowrap;
      text-overflow: ellipsis;
      overflow: hidden;
      outline: 0;
      border: none;
      border-radius: 2*2px;
      transition-duration: 300ms;
      transform: translate3d(0, 0, 0);

      &:active {
          // background: @tap-color;
      }
      .iconfont {
          .flex-shrink(0);
          pointer-events: none;
          margin: 0 4*2px;
      }
      .ripple-ink { // 点击水波
          // color: rgba(255,255,255,0.4);
          color: rgba(0,0,0,0.2);
      }
      &.button-mini {
          width: auto;
          line-height: 30*2px;
          font-size: 14*2px;
          padding: 0 .75em;
          display: inline-block;
      }
  }
}

/*gap between btn*/
.x-button + .x-button {
    margin-top: 30px;
}

.button-raised {
    .depth(1);
    &.active-state,
    html:not(.watch-active-state) &:active {
        .depth(2);
    }
    // 提升视觉，给人更近的感觉
    // &:after {
    //     content: " ";
    //     width: 200%;
    //     height: 200%;
    //     position: absolute;
    //     top: 0;
    //     left: 0;
    //     border: 1px solid rgba(0, 0, 0, .1);
    //     transform: scale(.5);
    //     transform-origin: 0 0;
    //     box-sizing: border-box;
    // }
}
</style>
