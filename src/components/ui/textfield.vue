<template>
<!-- 组件须被一个容器包裹，否则父组件 @click 子组件事件时会失效 -->
<container>
<div class="box">
  <label for="field.value">{{field.label}}</label>
  <input
    :class="[state, {active: (active || field.value)}]"
    v-model="field.value"
    type="{{ field.type || 'text' }}"
    placeholder={{field.placeholder}}
    @focus='inputFocus'
    @blur='inputblur'
    >
  <div
    @click='clear'
    class="clear"
    v-show="field.value && active">    <!-- 使用延时防止 blur 事件先于点击事件让 active 值为 false， 防止QQ浏览下此功能失效 -->
    <span class="mui-icon mui-icon-close"></span>
  </div>
  <!--
  message 要同步显示必须之前就存在于父组件,
  也可以在父组件使用以下语句添加 message 属性：
  this.mobile = Object.assign({}, this.mobile, {message: '需要输入您的手机号码。'})
  见Vue教程深入响应式原理
  -->
  <div
    class="msg"
    :class="[state]"
    v-text="field.message">
  </div>
</div>
</container>
</template>

<script>
import Container from "./container"

/**
 * textfield
 * @module components/ui/textfield
 *
 * @param {object} field - 组件绑定的数据对象
 * @param {string} [feild.type=text] - field 类型，接受 text, number, email, url, tel, date, datetime, password等
 * @param {string} [feild.label] - 标签
 * @param {string} [feild.placeholder] - placeholder
 * @param {string} [feild.value] - 组件双向绑定的字段值
 * @param {string} [feild.state] - 表单字段校验状态，接受 error, warning, success
 * @param {string} [feild.message] - 表单字段校验信息/提示信息，接受 error, warning, success

 * @param {string} [validate] - 字段验证函数，子组件中触发验证，父组件中定义和改变验证状态与信息
 *
 * @example
 * <textfield :field="mobile" @validate="validateMobile"></textfield>
 * mobile 具体数据在 <script> 部分组装和改变。
 */
export default {
  data () {
    return {
      active: false,
    }
  },
  props: {
    field: Object,
    validate: Function,
  },
  computed: {
    state() {
      return this.field.state && !this.active ? this.field.state : ''
    }
  },
  methods: {
    validate() {
      this.$dispatch('validate', this.field.value)
    },
    clear() {
      this.field.value = ''
      this.validate()
    },
    inputFocus(e) {
      this.active = true
    },
    inputblur(e) {
      // 使用延时避免 QQ浏览器 清除功能失效。因为
      setTimeout(() => {
        this.active = false
        this.validate()
      }, 0);
    }
  },
  components: {
    Container
  }
}
</script>

<style scoped lang='less'>
@import "../../style/var.less";

.box {
  position: relative;
  height: 55px;
  margin: 0 auto;
  padding: 10px 0;
  background-color: transparent;
}
.box>label {
  font-size: 16px;
  font-weight: 600;
  color: @color-grey;
  text-align: left;
  overflow: hidden;
  display: block;
  position: absolute;
  top: 10px;
  left: 5px;
}
.box>input {
  font-size: 16px;
  height: 24px;
  color: @color-black;
  text-align: left;
  display: block;
  width: 100%;
  margin: 0;
  padding-left: 88px;
  padding-top: 6px;
  border: 1px solid transparent;
  border-bottom-color: @color-grey;
  border-radius: 0;
  outline: none;
  background-color: transparent;
}
.clear {
  position: absolute;
  right: 2px;
  top: 6px;
  color: @color-black;
}
.box>input.active {
  border-bottom-color: @color-black;
}
.box>input.error {
  border-bottom-color: @color-red;
}
.box>input.success {
  border-bottom-color: @color-blue;
}
.box>input.warning {
  border-bottom-color: @color-yellow;
}
.box>input::-webkit-input-placeholder {
  color: lighten(@color-grey, 30%);
}
.msg {
  position: absolute;
  top: 40px;
  left: 5px;
  font-size: 11px;
  line-height: 11px;
  text-align: left;
  color: lighten(@color-grey, 30%);
  background-color: transparent;
}
.msg.error {
  color: lighten(@color-red, 5%);
}
.msg.success {
  color: @color-blue;
}
.msg.warning {
  color: @color-yellow;
}
</style>
