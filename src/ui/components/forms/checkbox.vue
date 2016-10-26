<template>
<label class="checkbox" for="{{labelId}}" :class="{'disabled': disabled}">
  <input
  type="checkbox"
  v-model="value"
  :value="option"
  :disabled="disabled"
  id="{{labelId}}">
  <div class="checkbox-icon"></div>
  <span class="checkbox-label" v-if="label" v-text="label"></span>
</label>
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
      type: [String, Number],
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
.checkbox {
  position: relative;
  display: inline-flex;
  align-items: center;
  align-self: center;
  vertical-align: middle;
  input[type="checkbox"] {
    display: none;
    &:checked {
      + .checkbox-icon,
      + .checkbox-label + .checkbox-icon{
        border-color: @brand;
        background-color: @brand;
        &:after{
          opacity: 1;
        }
      }
    }
  }
  * {
    pointer-events: none;
  }

  &:last-child{
    margin-right: 0;
  }
}

.checkbox-icon {
  position: relative;
  width: 45/75rem;
  min-width: 45/75rem;
  height: 45/75rem;
  min-height: 45/75rem;
  border-radius: 100%;
  border-width: 2px;
  border-style: solid;
  border-color: @gray;
  background: transparent;
  transition-duration: 100ms;
  &:after {
    left: 50%;
    top: 50%;
    margin-left: -4/75rem;
    margin-top: -14/75rem;
    width: 11/75rem;
    height: 22/75rem;
    transform: rotate(45deg);
    opacity: 0;
    transition: opacity .1s ease;
    transition-delay: .1s;
    border-right: 2px solid #fff;
    border-bottom: 2px solid #fff;
    box-sizing: border-box;
    position: absolute;
    display: block;
    content: "";
  }

}

.checkbox-label{
  // color: @black;
  font-size: 16*2/75rem;
  margin-left: 10px;
  margin-right: auto;
}

.checkbox-icon,
.checkbox-label {
  flex: none;
  display: inline-block;
  vertical-align: middle;
}
// 禁选样式
.disabled {
  .checkbox-icon {
    border-color: #EEE;
  }
}
</style>
