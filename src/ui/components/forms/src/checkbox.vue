<template>
<label class="checkbox" :for="labelId" :class="{'disabled': disabled}">
  <input
  type="checkbox"
  v-model="currentValue"
  :value="option"
  :disabled="disabled"
  :id="labelId">
  <div class="checkbox-icon"></div>
  <span class="checkbox-label" v-if="label" v-text="label"></span>
</label>
</template>

<script>
export default {
  props: {
    // v-model 变量, 存放结果。复选为数组(由各个 option 组成)；单选则为布尔型
    value: {
      type: [Array, Boolean],
      required: true,
    },
    // 单个选项值，其他选项值在外部循环组装（用v-model绑定相同的变量）
    option: {
      type: [String, Number, Boolean],
      required: true,
    },
    label: String,
    disabled: Boolean,
  },
  data() {
    return {
      currentValue: this.value
    }
  },
  computed: {
    // 继承父组件 list-item 的 labelId,
    labelId() {
      return this.$parent.labelId ? this.$parent.labelId : Math.random().toString(36).substring(3, 8)
    }
  },
  watch: {
    value(val) {
      this.currentValue = val;
    },

    currentValue(val) {
      this.$emit('input', val);
    }
  },

}
</script>

<style scoped lang="less">
@import '../../../styles/_vars';

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
  width: 20px;
  min-width: 20px;
  height: 20px;
  min-height: 20px;
  border-radius: 10px;
  border-width: 1px;
  border-style: solid;
  border-color: @gray;
  background: transparent;
  // transition-duration: 100ms;
  &:after {
    left: 50%;
    top: 50%;
    margin-left: -2px;
    margin-top: -7px;
    width: 5px;
    height: 10px;
    transform: rotate(45deg);
    opacity: 0;
    transition: opacity .1s ease;
    // transition-delay: .1s;
    border-right: 1px solid #fff;
    border-bottom: 1px solid #fff;
    box-sizing: border-box;
    position: absolute;
    display: block;
    content: "";
  }

}

.checkbox-label{
  // color: @black;
  font-size: 14px;
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
  color: #DDD;
  .checkbox-icon {
    border-color: #DDD;
  }
}
</style>
