<template>
  <cell :class="{'weui-cell_warn': state == 'warn' && !focus}" v-clickoutside="onBlur">
    <label slot="left" v-if="label" :for="id" class="weui-label">{{label}}</label>
    <textarea
      class="weui-textarea"
      ref="textarea"
      :placeholder="placeholder"
      :rows="rows || 3"
      :disabled="disabled"
      :readonly="readonly"
      v-model="currentValue"
      v-if="type === 'textarea'">
    </textarea>
    <input v-else
      class="weui-input"
      :id="id"
      ref="input"
      :value="currentValue"
      @input="onInput"
      @focus="onFocus"
      :type="currentType"
      :placeholder="placeholder"
      :pattern="pattern"
      :disabled="disabled"
      :readonly="readonly"
      :autocomplete="autocomplete"
      :autocapitalize="autocapitalize"
      :autocorrect="autocorrect"
      :spellcheck="spellcheck"
      :number="type === 'number'" />
    <div slot="right">
      <div>
      <i :class="['weui-icon-' + state]" v-if="state && !focus"></i>
      <icon @click.native="onClear" v-show="currentValue && focus" :size="15" name="shanchu4" color="gray"></icon>
      <icon @click.native="onEye" v-if="type == 'password' && focus" :size="15" :name="currentType === 'password' ? 'xianshi' : 'yincang'" :color="currentType === 'password' ? 'semi' : 'gray'">
      </div>
      <slot name="right"></slot>
    </div>
    <div v-if="type === 'textarea' && !!maxLength" class="weui-textarea-counter"><span>{{currentLength || '0'}}</span>/{{maxLength}}</div>
  </cell>
</template>

<script>
// BUG: 文本框(和日期)在复杂表单中，(QQ浏览器)输入时手机虚拟键盘弹出导致页面所有cells底线消失，在UC中直接不显示底线。
// 这可能是cells/cell组件的问题。解决：使用 cells 将复杂表单拆分，textarea 尽量放在单独页面。
import { Cell } from '../../cells/index.js'
import { Icon } from '../../icon/index.js'
import Clickoutside from '../../../directives/clickoutside'

export default {
  name: 'textfield',

  components: {
    Cell,
    Icon,
  },

  directives: {
    Clickoutside
  },

  props: {
    type: {
      type: String,
      default: 'text' // text, number, tel, password, date, datetime-local ...
    },
    rows: [ String, Number ],
    label: String,
    value: [ String, Number ],
    state: String, // warn success ...
    readonly: Boolean,
    disabled: Boolean,
    placeholder: String,
    autocomplete: 'off',
    autocapitalize: 'off',
    autocorrect: 'off',
    spellcheck: 'false',
    maxLength: Number, // 限制文本长度, 在文本域中会显示当前字数和限制字数

  },

  data() {
    return {
      id: Math.random().toString(36).substring(3, 8),
      focus: false,
      currentType: this.type,
      currentValue: this.value,
    }
  },

  computed: {
    pattern() {
      if (this.type === 'number' || this.type === 'tel') {
        return '[0-9]*'
      }
    },
    currentLength() {
        return this.currentValue.length
    }
  },

  methods: {
    onInput(evt) {
      this.currentValue = evt.target.value
    },
    onFocus() {
      this.focus = true
      this.$emit('on-focus') // 可在外部控制状态显示
    },
    getFocus() {
      setTimeout(() => {
        document.getElementById(this.id).focus()
      }, 0)
    },
    onBlur() {
      this.focus = false
      this.$emit('on-blur') // 可在外部控制状态显示
    },
    onClear() {
      if (this.disabled || this.readonly) return
      this.currentValue = ''
      this.getFocus()
    },
    onEye() {
      this.currentType = this.currentType === 'password' ? 'text' : 'password'
      this.getFocus()
    }
  },

  watch: {
    value(val) {
      this.currentValue = val;
    },
    currentValue(val) {
      // 处理字数限制
      if (!!this.maxLength && this.currentLength >= this.maxLength) {
        this.$nextTick(() => {
          this.currentValue = this.currentValue.substring(0, this.maxLength)
        });
      }
      // 使用 input 事件可以在外部用 v-model 调用组件
      this.$emit('input', val)
    },
  }

}
</script>

<style lang="less">
@import "../../../styles/_vars.less";
@import "../../../styles/weui/icon/weui-icon_font.less";
@import "../../../styles/weui/widget/weui-cell/weui-form/weui-vcode.less";
</style>
