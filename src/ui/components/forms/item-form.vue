<template>
  <div class="item-form" :class="{'focus-state': focus, 'not-empty-state': noEmpty}">
    <div class="item-form-icon" v-if="icon">
      <icon :name="icon"></icon>
    </div>
    <div class="item-form-content">
      <div class="label" v-if="label">{{label}}</div>
      <slot></slot>
    </div>
  </div>
</template>

<script>
/**
 * item-form 表单条目
 * @module components/ui/forms/item-form
 * 依赖于: icon 组件
 *
 * 采纳修改于 vue-carbon/blob
 * https://github.com/myronliu347/vue-carbon/blob/master/src/forms/itemForm.vue
 *
 * @param {string} [label=''] - 标签
 * @param {string} [icon=''] - 图标
 * @param {boolean} [focus=false] - 焦点(激活)
 * @param {boolean} [noEmpty=false] - 有值时的状态
 *
 * @example
 * <icon :size="18" name="gouwuche">
 */

import Icon from '../icon/icon.vue'
export default {
  props: {
    label: {
      type: String,
      default: ''
    },
    icon: {
      type: String,
      default: ''
    },
    focus: {
      type: Boolean,
      default: false
    },
    noEmpty: {
      type: Boolean,
      default: false
    }
  },
  components: {
    Icon
  }
}
</script>

<style lang="less">
@import "../../styles/_vars.less";
@import "../../styles/vue-carbon/_mixins.less";
.item-form{
  position: relative;
  padding-left: 16px;
  min-height: 48px;
  color: @gray;
  font-size: 14px;
  display: flex;
  &.focus-state,
  &.not-empty-state {
    .floating-label {
      transform: scale(1) translateY(0);
    }
  }
  &.focus-state {
    .floating-label {
      color: @brand;
    }
  }
}
.item-form-icon{
  width: 40px;
  height: 36px;
  display: flex;
  align-items: center;
  margin-top: 31px;
  .flex-shrink(0);
  + .item-form-content{
    margin-left: 16px;
  }
}
.item-form-content{
  flex: 1;
  padding-top: 10px;
  padding-bottom: 10px;
  padding-right: 16px;
  width: 100%;
  .item-form{
    padding-left: 0;
  }
  .item-form-content{
    padding: 0;
  }
}
.floating-label,
.label {
  vertical-align: top;
  -webkit-backface-visibility: hidden;
  backface-visibility: hidden;
  -webkit-perspective: 1000;
  perspective: 1000;
  transition-duration: 200ms;
  width: 35%;
  .flex-shrink(0);
}
.floating-label,
.label {
  font-size: 14px;
  width: 100%;
}
.floating-label {
  transform-origin: left;
  transform: scale(14/12) translateY(21px);
  color: @gray;
  width: auto;
  max-width: 75%;
}
.item-form.focus-state{
  color: @brand;
}
</style>
