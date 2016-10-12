<template>
<!-- 外层 div 防止多个 label 混乱 -->
<div style="display: inline-flex;">
  <label class="checkbox" :for="labelId">
    <input class="check" type="checkbox" v-model="value" :value="option" :disabled="disabled" :id="labelId">
    <i class="weui_icon_checked"></i>
    <span class="text" v-if="label" v-text="label"></span>
  </label>
</div>
</template>

<script>
export default {
  props: {
    // 存放选取结果的数组变量，由各个 option 组成，使用:value.sync双向绑定，可在外部指定已选项
    value: {
      type: Array,
      required: true,
    },
    // 单个选项值，其他选项值在外部循环组装（即绑定相同的value变量）
    option: {
      type: String,
      required: true,
    },
    label: String,
    disabled: Boolean,
  },
  computed: {
    // 继承父组件 list-item 的 labelId,
    labelId() {
      return this.$parent.labelId ? this.$parent.labelId : Math.random().toString(36).substring(3, 8)
    }
  },
}
</script>

<style scoped lang="less">@import '../../styles/_vars';
@import '../../styles/weui/icon/weui_icon_font';
.checkbox {
    position: relative;
    display: inline-flex;
    align-self: center;
    align-items: center;
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
   .text
   {
     margin-left: 5px;
     color: @black;
     font-size: 16px;
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
