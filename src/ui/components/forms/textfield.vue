<template>
  <item-form :focus="focus" :no-empty="!!value" :icon="icon">
    <label class="text-field">
      <div :class="{'label': !labelFloat, 'floating-label': labelFloat}" v-if="label">{{label}}</div>
      <input :type="type" v-model="value"  @focus="onfocus" @blur="onblur"
        v-if="type !== 'textarea'"  autocomplete="off" :placeholder="placeholder" />
      <textarea v-model="value" @focus="onfocus" @blur="onblur"
          :style="{'height': height + 'px'}" v-el:textarea
          class="resizable"
          v-if="type === 'textarea'" @focus="this.focus = true"
          @blur="this.focus = false"  v-model="value"
          :placeholder="placeholder">
      </textarea>
    </label>
    <div class="clear"><icon name="shanchu4" :size="36"  v-if="!!value" @click="value = ''"></icon></div>
    <!-- 父组件错误最好显示后自动消失 -->
    <div class="error" v-if="(error || perror) && !focus"><icon name="error" color="red" :size="24">{{ error ? error : perror}}</icon></div>
  </item-form>
</template>

<script>
/**
 * button
 * @module components/ui/button/button
 * 依赖于: icon, item-form 组件 及 Validator 验证器
 *
 * 借鉴于 vue-carbon/blob
 * https://github.com/myronliu347/vue-carbon/blob/master/src/forms/textField.vue
 *
 * @param {string} [value=''] - :value.sync 输入数据
 * @param {string} [label=''] - label
 * @param {string} [icon=''] - 图标
 * @param {string} [type='text'] - 文本框类型，支持 text,password,tel,number,search,select,textarea,time,url,date,datetime-local,email
 * @param {string} [placeholder=''] - placeholder
 * @param {number} [rows=1] - 文本域行数，只有类型为 textarea 时才有效
 * @param {boolean} [focus=false] - 聚焦（活动状态）
 * @param {boolean} [label-float=false] - label 浮动
 * 数据验证
 * 验证时机：失焦 与 值改变时
 * 显示时机：失焦
 * @param {string} [rules=''] - 验证规则字串，使用 '|' 分隔，调用参数与使用函数一样。如：'required|max_length(12)|min_length(2)'
 * @param {string} [errors=''] - 规则相对应的错误显示信息，如：'请输入XXX|长度不能大于12|长度不能小于2'
 * @param {string} [perror=''] - :perror.sync 父组件错误信息，要达到 value 一改变 perror 就消除的目的，须用双向同步
 * @param {boolean} [passed=false] - :passed.sync 是否通过验证（并且 !perror），须用双向同步父组件才可获取验证结果
 *
 * @example
 * <icon :size="18" name="gouwuche">
 */
import Icon from '../icon/icon.vue'
import itemForm from './item-form'
import Validator from '../../utils/validator'

export default {
  components: {
    Icon,
    itemForm,
  },
  props: {
    label: {
      type: String,
      default: ''
    },
    labelFloat: {
      type: Boolean,
      default: false
    },
    icon: {
      type: String,
      default: ''
    },
    type: {
      type: String,
      default: 'text'
    },
    focus: {
      type: Boolean,
      default: false
    },
    placeholder: {
      type: String,
      default: ''
    },
    rows: {
      type: Number,
      default: 1
    },
    value: {
      type: String,
      default: ''
    },
    rules: {
      type: String,
      default: ''
    },
    errors: {
      type: String,
      default: ''
    },
    perror: {
      type: String,
      default: ''
    },
    passed: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      height: 0,
      error: ''
    }
  },
  attached () {
    this.resizeTextarea()
  },
  methods: {
    validate () {
      if (this.rules !== '') {
        let v = (new Validator).validate({
          value: this.value,
          rules: this.rules,
          errors: this.errors
        })
        this.error = v.error
        this.passed = v.passed
        this.passed = this.perror ? false : this.passed
      }
    },

    // 以下为 vue-carbon/blob 原有方法，不要轻易修改
    resizeTextarea () {
      let element = this.$els.textarea
      if (!element) return
      let lineHeight = window.getComputedStyle(element, null).getPropertyValue('line-height')
      lineHeight = Number(lineHeight.substring(0, lineHeight.indexOf('px')))
      let pt = window.getComputedStyle(element, null).getPropertyValue('padding-top')
      pt = Number(pt.substring(0, pt.indexOf('px')))
      let pd = window.getComputedStyle(element, null).getPropertyValue('padding-bottom')
      pd = Number(pd.substring(0, pd.indexOf('px')))
      let line = this.getLineNum(this.value)
      line = line > this.rows ? line : this.rows
      let height = pd + pt + lineHeight * line
      this.height = height
    },
    getLineNum (value, line) {
      line = line || 0
      line++
      if (!value || value.indexOf('\n') === -1) return line
      let num = value.indexOf('\n')
      return this.getLineNum(value.substring(num + 1), line)
    },
    onfocus () {
      this.focus = true
    },
    onblur () {
      // 验证
      this.validate()
      // 失焦最后改变状态，避免 QQ 浏览器执行其他操作无效，如清除输入
      setTimeout(() => this.focus = false, 0);
    }
  },
  ready () {
    this.resizeTextarea()
  },
  watch: {
    value () {
      this.resizeTextarea()
      this.$emit('input-change', this.value)
      this.perror = ''
      this.validate()
    },
    perror () {
      // 有 perror 时，让 passed 为假
      this.validate()
    }
  },

}
</script>

<style lang="less">
@import "../../styles/_vars.less";
@import "../../styles/vue-carbon/_mixins.less";
.text-field {
  width: 100%;
  display: block;
  position: relative;
  .hairline(bottom, #d3d6db);
  &:after {
    -webkit-backface-visibility: hidden;
    backface-visibility: hidden;
    -webkit-perspective: 1000;
    perspective: 1000;
    .translate3d();
    transition-duration: 200ms;
  }
  &.focus-state:after,
  &.not-empty-state:after,
  .focus-state &:after,
  .not-empty-state &:after {
    background: @semi;
    transform: scaleY(1) !important;
  }
}
input[type="date"],
input[type="datetime-local"],
input[type="email"],
input[type="number"],
input[type="password"],
input[type="search"],
input[type="tel"],
input[type="text"],
input[type="time"],
input[type="url"],
select,
textarea {
  -webkit-appearance: none;
  -moz-appearance: none;
  -ms-appearance: none;
  appearance: none;
  outline: none;
  box-sizing: border-box;
  border: none;
  background: none;
  border-radius: 0 0 0 0;
  box-shadow: none;
  display: block;
  padding: 0;
  margin: 0;
  width: 100%;
  height: 36*2px;
  color: @semi;
  font-size: 16*2px;
  font-family: inherit;
  &::-webkit-input-placeholder {
    color: @gray;
  }
}
.clear {
  color: @semi;
  position: absolute;
  right: 25*2px;
  bottom: 15*2px;
}
.error {
  position: absolute;
  left: 75*2px;
  bottom: -12*2px;
}
</style>
