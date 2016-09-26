<template>
<a href="javascript:;" class="button" v-el:button :class="buttonClass">
  <slot>
    <icon v-if="icon" :name="icon" :size="18"></icon>
    <span class="button-text" v-if="text">{{text}}</span>
  </slot>
  <ripple :trigger="$els.button"></ripple>
</a>
</template>

<script>
/**
 * button
 * @module components/ui/button/button
 * 依赖于: icon 及 ripple 组件
 *
 * 采纳修改于 vue-carbon/blob
 * https://github.com/myronliu347/vue-carbon/blob/master/src/button/button.vue
 *
 * @param {string} [icon=''] - 按钮图标
 * @param {string} [text=''] - 按钮文本
 * @param {string} [color=''] - 按钮颜色，默认 carbon(碳色) , 支持 red, green, blue, amber(琥珀色)
 * @param {boolean} [fill=false] - 填充颜色
 * @param {boolean} [raised=false] - 浮雕按钮
 * @param {boolean} [big=false] - 大号按钮
 *
 * @example
 * <icon :size="18" name="gouwuche">
 */
import ripple from '../ripple'
import icon from '../icon'
export default {
  props: {
    icon: {
      type: String,
      default: ''
    },
    text: {
      type: String,
      default: ''
    },
    fill: {
      type: Boolean,
      default: false
    },
    raised: {
      type: Boolean,
      default: false
    },
    big: {
      type: Boolean,
      default: false
    },
    color: {
      type: String,
      default: ''
    }
  },
  computed: {
    buttonClass() {
      let style = {
        'button-fill': this.fill,
        'button-big': this.big,
        'button-raised': this.raised,
        'button-gray': this.gray
      }
      if (this.color) style['color-' + this.color] = true
      return style
    }
  },
  components: {
    icon,
    ripple
  }
}
</script>

<style lang="less">
@import "../../style/_vars.less";
@import "../../style/vue-carbon/_mixins.less";
.button {
    color: @color;
    border-radius: 2px;
    height: 36px;
    font-size: 18px;
    line-height: 36px;
    appearance: none;
    background: none;
    text-decoration: none;
    text-align: center;
    margin: 0;
    white-space: nowrap;
    text-overflow: ellipsis;
    text-transform: uppercase;
    min-width: 64px;
    padding: 0 8px;
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
    i.icon + i.icon,
    i.icon + span {
        margin-left: 8px;
    }
    .button-text,
    .icon {
        pointer-events: none;
    }
    .icon {
        .flex-shrink(0);
    }
    .button-text {
        .flex-shrink(1);
        white-space: nowrap;
        text-overflow: ellipsis;
        overflow: hidden;
        word-wrap: break-word;
        margin: 0 3px;
    }
    .ripple-ink {
        color: @tap-color;
    }
    &.color-red {
        color: @red;
    }
    &.color-green {
        color: @green;
    }
    &.color-amber {
        color: @amber;
    }
    &.color-blue {
        color: @blue;
    }
}
.button-fill {
    background-color: @carbon;
    color: #fff;
    .ripple-ink {
        color: rgba(255,255,255,0.4);
    }
    &:active {
        background-color: darken(@carbon, 8%);
    }
    &.color-red {
        color: #fff;
        background-color: @red;
        &:active {
            background-color: darken(@red, 8%);
        }
    }
    &.color-green {
        color: #fff;
        background-color: @green;
        &:active {
            background-color: darken(@green, 8%);
        }
    }
    &.color-amber {
        color: #fff;
        background-color: @amber;
        &:active {
            background-color: darken(@amber, 8%);
        }
    }
    &.color-blue {
        color: #fff;
        background-color: @blue;
        &:active {
            background-color: darken(@blue, 8%);
        }
    }
}
.button-big {
    height: 48px;
    line-height: 48px;
    border-radius: 3px;
}
.button-raised {
    .depth(1);
    &.active-state,
    html:not(.watch-active-state) &:active {
        .depth(2);
    }
}
</style>
