<template>
<container>
  <button class="x-button" :class="['x-button-' + type, 'x-button-' + size, {
          'is-disabled': disabled,
          'is-plain': plain
        }]" @touchstart="handleClick">
    <span class="x-button-icon" v-if="icon || _slotContents.icon">
      <slot name="icon">
        <i v-if="icon" class="mintui" :class="'mintui-' + icon"></i>
      </slot>
    </span>
    <label class="x-button-text"><slot></slot></label>
  </button>
</container>
</template>

<script>
import Container from "./container"

/**
 * mt-header
 * @module components/button
 * @desc 按钮
 * @param {string} [type=default] - 显示类型，接受 default, primary, danger
 * @param {boolean} [disabled=false] - 禁用
 * @param {boolean} [plain=false] - 幽灵按钮
 * @param {string} [size=normal] - 尺寸，接受 normal, small, large
 * @param {string} [icon] - 图标，提供 more, back，或者自定义的图标（传入不带前缀的图标类名，最后拼接成 .mintui-xxx）
 * @param {slot} - 显示文本
 * @param {slot} [icon] 显示图标
 *
 * @example
 * <mt-button size="large" icon="back" type="primary">按钮</mt-button>
 */
export default {
  name: 'x-button',
  props: {
    icon: String,
    disabled: Boolean,
    plain: Boolean,
    type: {
      type: String,
      default: 'default',
      validator(value) {
        return [
          'default',
          'danger',
          'primary'
        ].indexOf(value) > -1;
      }
    },
    size: {
      type: String,
      default: 'normal',
      validator(value) {
        return [
          'small',
          'normal',
          'large'
        ].indexOf(value) > -1;
      }
    }
  },
  methods: {
    handleClick($event) {
      if (this.disabled) {
        $event.preventDefault();
        $event.stopPropagation();
      }
    }
  },
  components: {
    Container
  }
};
</script>

<style scoped lang='less'>@import "../../style/var.less";
.x-button {
    appearance: none;
    border-radius: 0;
    border: 0;
    box-sizing: border-box;
    color: inherit;
    display: block;
    font-size: 18px;
    height: 41px;
    outline: 0;
    overflow: hidden;
    position: relative;
    text-align: center;
}
.x-button::after {
    background-color: @color-grey-light;
    content: " ";
    opacity: 0;
    position: absolute 0 0 0 0;
}
.x-button:not(.is-disabled):active::after {
    opacity: 0.4;
}
.icon {
    vertical-align: middle;
    display: inline-block;
}
.x-button-default {
    color: @color-grey;
    background-color: @color-bg;
    box-shadow: @color-grey-light;
    .plain {
        border: 1px solid @color-grey-light;
        background-color: transparent;
        box-shadow: none;
        color: @color-grey-light;
    }
}
.x-button-primary {
    color: @color-white;
    background-color: @color-brand;
    .plain {
        border: 1px solid @color-brand;
        background-color: transparent;
        color: @color-white;
    }
}
.x-button-danger {
    color: @color-white;
    background-color: @color-yellow;
    .plain {
        border: 1px solid @color-yellow;
        background-color: transparent;
        color: @color-white;
    }
}
.x-button-large {
    display: block;
    width: 100%;
}
.x-button-normal {
    display: inline-block;
    padding: 0 12px;
}
.x-button-small {
    display: inline-block;
    font-size: 14px;
    padding: 0 12px;
    height: 33px;
}
.disabled {
    opacity: 0.6;
}
</style>
