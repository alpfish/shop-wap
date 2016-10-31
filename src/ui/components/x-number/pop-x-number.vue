<!-- 弹出式数字输入组件 -->
<template>
  <div class="x-number">
    <div @click="sub" class="selector sub" :class="subClass">-</div>
    <input @focus="onFocus" class="input" :class="inputClass" v-model="value" :readonly="disabled"/>
    <div @click="add" class="selector plus" :class="addClass">+</div>
  </div>
  <confirm @on-confirm="onConfirm" @on-cancel="onCancel" :show.sync="confirming" title="" cancel-text="取消" confirm-text="确认" dialog-transition="">
    <div class="confirm-center">
      <div class="x-number">
        <div @click="sub" class="selector sub" :class="subClass">-</div>
        <input class="input" :class="inputClass" :style="{'width': (120/75)+'rem'}" type="tel" autofocus number pattern="[0-9]*"
          v-model="value" :id="id"/>
        <div @click="add" class="selector plus" :class="addClass">+</div>
      </div>
    </div>
  </confirm>
  <toast :show.sync="toastShow" :text.sync="toastText" type="text"></toast>
</template>
<script>
import Confirm from '../confirm'
import Toast from '../toast'

export default {
  components: {
    Confirm,
    Toast,
  },
  props: {
    min: Number,
    max: Number,
    step: {
      type: Number,
      default: 1
    },
    value: {
      type: Number,
      required: true,
      default: 0
    },
    name: String,
    disabled: Boolean,
  },
  data() {
    return {
      confirming: false,
      cancelValue: 0,
      toastShow: false,
      toastText: '',
    }
  },
  computed: {
    id () {
      return 'x-number-' + Math.random().toString(36).substring(3, 8)
    },
    disabledMin () {
      return typeof this.min === 'undefined' ? false : this.value <= this.min
    },
    disabledMax () {
      return typeof this.max === 'undefined' ? false : this.value >= this.max
    },
    subClass() {
      return {
        disabled: this.disabled || this.disabledMin
      }
    },
    addClass() {
      return {
        disabled: this.disabled || this.disabledMax
      }
    },
    inputClass() {
      return {
        disabled: this.disabled || (this.disabledMin && this.disabledMax)
      }
    }
  },
  methods: {
    add () {
      if (this.disabledMax && !this.disabled) {
        this.toastText = '已经够多了哦~.~'
        this.toastShow = true
      }
      if (!this.disabledMax && !this.disabled) {
        this.value += this.step
        this.change()
      }
    },
    sub () {
      if (this.disabledMin && !this.disabled) {
        this.toastText = '不能再少了哦~.~'
        this.toastShow = true
      }
      if (!this.disabledMin && !this.disabled) {
        this.value -= this.step
        this.change()
      }
    },
    onFocus () {
      if (!this.disabled) {
        this.cancelValue = this.value
        this.confirming = true
        setTimeout(() => {
          document.getElementById(this.id).focus()
        }, 0);
      }
    },
    onConfirm () {
      this.change()
    },
    onCancel () {
      this.value = this.cancelValue
    },
    change() {
      this.value = _.toInteger(this.value)
      // 按步长取值, 超过范围取最值
      let stepValue = this.step * Number.parseInt(this.value/this.step)
      if (this.value != stepValue) {
        this.value = stepValue
        this.toastText = `按${this.step}的倍数添加`
        this.toastShow = true
      }
      if (this.min && this.value < this.min) {
        this.value = this.min
        this.toastText = `最小为 ${this.min}`
        this.toastShow = true
      }
      if (this.max && this.value > this.max) {
        this.value = this.max
        this.toastText = `最大为 ${this.max}`
        this.toastShow = true
      }
      // 是否确认
      if (!this.confirming) {
        this.onChange()
      }
    },
    // 去抖动触发事件
    onChange: _.debounce (function() {
      this.$emit('on-change', this.value)
    }, 500),
  },
  ready() {
    // 校正最大值(购买数量超过库存)，注意死循环
    // 目前在购物车列表中加载一次只能异步校正一个条目的值
    if (this.max && this.value > this.max && this.max > this.min) {
      this.value = this.max
      this.change()
    }
  },
}
</script>

<style lang="less">
@import '../../styles/_vars.less';

.x-number {
  position: relative;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  color: @black-light-extra;

  .selector, .input {
    border:1px solid darken(@border-color, 30%); // @black-light-extra;//@border-color;
    height:25*2/75rem;
    line-height: 25*2/75rem; // 提升减号
    text-align:center;
  }
  .selector {
    flex: none;
    width: 30*2/75rem;
  }
  .input {
    flex: auto;
    width: 40*2/75rem;
    font-size: 15*2/75rem;
    appearance: none;
    outline: none;
  }
  .sub {
    border-right:none;
    border-radius:10px 0 0 10px;
    font-size: 25*2/75rem;
    line-height: 23*2/75rem; // 提升减号
  }
  .plus {
    border-left:none;
    border-radius:0 10px 10px 0;
    font-size: 18*2/75rem;
  }
  .disabled {
    color: @gray-light;
    border-color: @border-color;
  }
}

.confirm-center {
  width: 100%;
  text-align: center;
}
</style>
