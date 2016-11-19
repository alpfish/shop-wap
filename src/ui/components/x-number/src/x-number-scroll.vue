<template>
  <div class="x-number">
    <div @click="sub" class="selector sub" :class="subClass">-</div>
    <!-- 使用 change 事件代替 input 事件，结合 v-model.lazy 实现延迟更新, 防止异步时值反弹 -->
    <input class="input" :class="inputClass" type="number"
      ref="input"
      v-model.lazy="currentValue"
      @change="input"
      @focus="focus"
      :readonly="disabled" />
    <div @click="add" class="selector plus" :class="addClass">+</div>
    <!-- 输入时滚动至可见区域，单独设置参照元素控制滚动距离，否则输入框直接滚动到顶部 -->
    <span class="focus-scroll-position" :id="id"></span>
  </div>
</template>
<script>
import { Toast } from '../../toast'
import { MessageBox } from '../../message-box'

export default {

  props: {
    min: Number,
    max: Number,
    value: Number, // 以 v-model.number="nums" 形式调用
    disabled: Boolean,
    step: {
      type: Number,
      default: 1
    },
  },
  data() {
    return {
      currentValue: this.value,
    }
  },
  computed: {
    id () {
      return 'x-number-' + Math.random().toString(36).substring(3, 8)
    },
    disabledMin () {
      return typeof this.min === 'undefined' ? false : this.currentValue <= this.min
    },
    disabledMax () {
      return typeof this.max === 'undefined' ? false : this.currentValue >= this.max
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
    input (evt) {
      this.currentValue = evt.target.value
      this.change()
    },

    add () {
      if (this.disabledMax && !this.disabled) {
        Toast('已经够多了哦')
      }
      if (!this.disabledMax && !this.disabled) {
        this.currentValue += this.step
        this.change()
      }
    },

    sub () {
      if (this.disabledMin && !this.disabled) {
        Toast('不能再少了哦')
      }
      if (!this.disabledMin && !this.disabled) {
        this.currentValue -= this.step
        this.change()
      }
    },

    change() {
      this.currentValue = parseInt(this.currentValue)
      // 按步长取值, 超过范围取最值
      let stepValue = this.step * Number.parseInt(this.currentValue/this.step)
      if (this.currentValue != stepValue) {
        this.currentValue = stepValue
        Toast(`按${this.step}的倍数添加`)
      }
      if (this.min && this.currentValue < this.min) {
        this.currentValue = this.min
        Toast(`最小只能为 ${this.min}`)
      }
      if (this.max && this.currentValue > this.max) {
        this.currentValue = this.max
        Toast(`最大只能为 ${this.max}`)
      }
      this.onChange()
    },

    // 去抖动触发事件
    onChange: _.debounce (function() {
      // 使用 input 事件双向绑定
      this.$emit('input', this.currentValue)
      this.$emit('on-change', this.currentValue)
    }, 500),

    focus () {
      // 滚动定位
      // setTimeout(() => {
      //   document.getElementById(this.id).scrollIntoView()
      // }, 0);

      // 弹框输入
      if (!this.disabled) {
        MessageBox.prompt('数量', '', {
          inputValue: this.currentValue,
          inputType: 'number',
          inputPlaceholder: `${this.min} - ${this.max} 之间`,
        })
        .then(({value, action}) => {
          this.currentValue = value
          this.change()
          return;
        })
      }

    },
  },

  watch: {
    value(val) {
      // 保证父组件同步
      this.currentValue = parseInt(val)
    },
  },

  mounted() {
    // 校正最大值(购买数量超过库存)，注意死循环
    // 目前在购物车列表中加载一次只能异步校正一个条目的值
    if (this.max && this.currentValue > this.max && this.max > this.min) {
      this.currentValue = this.max
      this.change()
    }
  },
}
</script>

<style lang="less">
@import '../../../styles/_fn.less';

.x-number, .selector {
  .onePxBorder(@border-color, 10px); //1px
}

.x-number {
  position: relative;
  width: 100px;
  height: 25px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  color: @black;

  .selector, .input {
    position: relative;
    text-align:center;
  }
  .selector {
    flex: none;
    width: 30px;
    height:25px;
    line-height: 25px; // 提升减号
  }
  .input {
    flex: auto;
    width: 40px;
    height:23px; // 要比 .x-number 少2px, 否则 onePxBorder 不显示
    font-size: 15px;
    appearance: none;
    outline: none;
    border: none;
  }
  .sub {
    font-size: 25px;
    line-height: 23px; // 提升减号
    &:before {
      border-radius: 10px 0 0 10px;
    }
  }
  .plus {
    font-size: 18px;
    &:before {
      border-radius:0 10px 10px 0;
    }
  }
  .disabled {
    color: @border-color;
  }
  .focus-scroll-position {
    position: absolute;
    // scrollIntoView() 默认滚动元素至顶部，使用-300px设置与顶部的距离
    top: -120px;
  }
}
</style>
