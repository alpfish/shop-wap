<template>
  <div class="x-number border">
    <div @click="sub" class="selector sub":class="{'disabled':disabledMin}">-</div>
    <input v-model="value" :name="name" class="input" :style="{width: getWidth}" number :readonly="!fillable" type="tel" pattern="[0-9]*"/>
    <div @click="add" class="selector plus" :class="{'disabled':disabledMax}">+</div>
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
      default: 0,
    },
    name: String,
    fillable: Boolean,
    width: {
      type: [Number, String],
      default: 45
    }
  },
  computed: {
    disabledMin () {
      return typeof this.min === 'undefined' ? false : this.value <= this.min
    },
    disabledMax () {
      return typeof this.max === 'undefined' ? false : this.value >= this.max
    },
    getWidth() {
      return typeof this.width === 'string' ? this.width : `${this.width}px`
    }
  },
  ready () {
    // 按步长修正值
    if (this.min < this.step) {
      this.min = this.step
      this.value = Number.parseInt(this.value/this.step) * this.step
      this.value = this.value < this.step ? this.step : this.value
    }
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
      this.$emit('on-change', this.value)
    }
  },
  methods: {
    add () {
      if (!this.disabledMax) {
        this.value += this.step
      }
    },
    sub () {
      if (!this.disabledMin) {
        this.value -= this.step
      }
    }
  }
}
</script>

<style lang="less">
@import '../../styles/_vars.less';

@x-number-color: @primary;

.x-number {
  position: relative;
  display: inline-flex;
  align-items: center;
  justify-content: center;

  .selector, .input {
    flex: 1;
    height:35px;
    line-height: 33px; // 提升减号
    text-align:center;
  }
  .selector {
    width: 35px;
    font-size: 24px;
    font-family: "Helvetica Neue",Helvetica,Arial,sans-serif;
    color: @x-number-color;
  }
  .input {
    font-size: 18px;
    color: @black-light;
    appearance: none;
    border: none;
    outline: none;
  }
  .disabled {
    color: @gray;
  }
  .sub {
    font-size: 28px;
  }
}

.border {
  .input {
    border:1px solid @border-color;
    border-radius: 1px;
  }
  .selector {
    border:1px solid @border-color;
  }
  .sub {
    border-right:none;
    border-radius:2px 0 0 2px;
  }
  .plus {
    border-left:none;
    border-radius:0 2px 2px 0;
  }
}
</style>
