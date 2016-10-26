<!-- 滚动式数字输入组件 -->
<template>
  <div class="x-number" :class="{'x-number-border': border, 'x-number-focus': fillable && !disabled}">
    <!-- 输入时滚动至可见区域，单独设置参照元素控制滚动距离，否则输入框直接滚动到顶部 -->
    <span class="focus-scroll" :id="'focus-'+id"></span>
    <div @click="sub" class="selector sub" :class="{'disabled':disabledMin || disabled}">-</div>
    <input @focus="onFocus" class="input" :style="{'width': getWidth}" type="tel" pattern="[0-9]*" number
      v-model="value" :id="id" :name="name" :readonly="!fillable || disabled"/>
    <div @click="add" class="selector plus" :class="{'disabled':disabledMax || disabled}">+</div>
  </div>
</template>
<script>
export default {
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
    fillable: Boolean,
    disabled: Boolean,
    border: {
      type: Boolean,
      default: true
    },
    width: {
      type: [Number, String],
      default: `${40*2/75}rem`
    },
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
    getWidth() {
      return typeof this.width === 'string' ? this.width : `${this.width}px`
    },
  },
  watch: {
    value (newValue, old) {
      // 按步长取值, 超过范围取最值
      this.value = Number.parseInt(this.value/this.step) * this.step
      if (this.min && this.value < this.min) {
        this.value = this.min
      }
      if (this.max && this.value > this.max) {
        this.value = this.max
      }
      this.onChange()
    }
  },
  methods: {
    add () {
      if (!this.disabledMax && !this.disabled) {
        this.value += this.step
      }
    },
    sub () {
      if (!this.disabledMin && !this.disabled) {
        this.value -= this.step
      }
    },
    // 去抖动触发事件
    onChange: _.debounce (function() {
      this.$emit('on-change', this.value)
    }, 500),
    onFocus () {
      /*
      * 输入时滚动至可见区域
      * 不知是何原因，以上三种方法均无法滚动页面，故只有使用 scrollIntoView 方法
      * window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop
      */
      document.getElementById('focus-'+this.id).scrollIntoView()
    },
  }
}
</script>

<style lang="less">
@import '../../styles/_vars.less';

.x-number {
  position: relative;
  display: inline-flex;
  align-items: center;
  justify-content: center;

  .selector, .input {
    height:25*2/75rem;
    line-height: 22*2/75rem; // 提升减号
    text-align:center;
  }
  .selector {
    flex: none;
    width: 30*2/75rem;
    font-size: 18*2/75rem;
    // font-family: "Helvetica Neue",Helvetica,Arial,sans-serif;
    color: @black-light-extra;
  }
  .x-number-input {
    flex: auto;
    font-size: 15*2/75rem;
    color: @black;
    appearance: none;
    border: none;
    outline: none;
  }
  .focus-scroll {
    position: absolute;
    // scrollIntoView() 默认滚动元素至顶部，使用-300px设置与顶部的距离
    top: -300px;
  }
  .disabled {
    color: #DDD;
  }
  .sub {
    font-size: 28*2/75rem;
  }
}

.x-number-border {
  .input {
    border:1px solid @border-color;
    border-radius: 1px;
  }
  .selector {
    border:1px solid @border-color;
  }
  .sub {
    border-right:none;
    border-radius:6px 0 0 6px;
  }
  .plus {
    border-left:none;
    border-radius:0 6px 6px 0;
  }
}

.x-number-focus {
  .input {
    &:focus {
      border:1px solid @black;
    }
  }
}
</style>
