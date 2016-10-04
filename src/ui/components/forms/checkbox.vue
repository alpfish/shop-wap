<template>
<!-- 外层 div 防止多个 label 混乱 -->
<div style="display: inline-flex;">
  <label class="checkbox" :for="labelId">
    <input class="check" type="checkbox" v-model="result" :value="value" :disabled="disabled" :id="labelId">
    <i class="weui_icon_checked"></i>
  </label>
  <slot>{{ value }}</slot>
</div>
</template>

<script>
export default {
  props: {
    // 结果存放数组，由各个 value 组成，自动双向绑定，可在外部指定已选项
    result: {
      type: Array,
      required: true,
    },
    // 单个选项值，多个值在外部组装（即绑定相同的results变量）
    value: {
      type: String,
      // required: 'true',
    },
    disabled: Boolean,
  },
  computed: {
    // 继承父组件 list-item 的 labelId,
    labelId() {
      return this.$parent.labelId ? this.$parent.labelId : Math.random().toString(36).substring(3, 8)
    }
  },
  ready() {
    console.log(this.labelId);
  }
}
</script>

<style scoped lang="less">@import '../../styles/_vars';
@import '../../styles/weui/icon/weui_icon_font';
.checkbox {
    position: relative;
    display: inline-flex;
    align-self: center;
    align-items: center;
    margin-right: 5px;
    &:active {
        background-color: none;
    }
    // 未选样式
    .weui_icon_checked {
        &:before {
            content: '\EA01';
            color: #C9C9C9;
            font-size: 23px;
        }
    }
}

input[type="checkbox"] {
    // 选中样式
    &:checked {
        & + .weui_icon_checked {
            &:before {
                content: '\EA06';
                color: @primary;
            }
        }
    }
    * {
        pointer-events: none;
    }
}
.check {
    // 隐藏原生样式
    position: absolute;
    // left: -9999em;
    left: -9999px;
    // em 单位有时无法隐藏？
}
</style>
