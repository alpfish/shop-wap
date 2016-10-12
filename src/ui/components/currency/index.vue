<!-- Currency 货币组件 -->
<template>
  <span class="currency"><span v-text="head" :style="headStyle"></span><span v-text="foot" :style="footStyle"></span></span>
</template>

<script>
import {
  getColor
} from 'ui/styles/_vars'

export default {
  props: {
    value: [String, Number],
    currency: {
      type: String,
      default: '￥'
    },
    decimals: {
      type: Number,
      default: 2
    },
    color: {
      type: String,
      default: 'red'
    },
    size: {
      type: [String, Number],
      default: `${13/64}rem`
    },
    floatSize: {
      type: [String, Number],
      default: `${11/64}rem`
    }
  },
  computed: {
    head () {
      let stringified = this.format(this.value, this.currency, this.decimals)
      return this.decimals
        ? stringified.slice(0, -1 - this.decimals)
        : stringified
    },
    foot () {
      let stringified = this.format(this.value, this.currency, this.decimals)
      return this.decimals
        ? stringified.slice(-1 - this.decimals)
        : ''
    },
    headStyle () {
      return {
        'font-size': typeof this.size === 'string' ? this.size : `${this.size}px`,
        'color': getColor(this.color),
      }
    },
    footStyle () {
      return {
        'font-size': typeof this.floatSize === 'string' ? this.floatSize : `${this.floatSize}px`,
        'color': getColor(this.color)
      }
    },
  },
  methods: {
    format (value, currency, decimals) {
      const digitsRE = /(\d{3})(?=\d)/g
      value = parseFloat(value)
      if (!isFinite(value) || (!value && value !== 0)) return ''
      currency = currency != null ? currency : '￥'
      decimals = decimals != null ? decimals : 2
      var stringified = Math.abs(value).toFixed(decimals)
      var _int = decimals
        ? stringified.slice(0, -1 - decimals)
        : stringified
      var i = _int.length % 3
      var head = i > 0
        ? (_int.slice(0, i) + (_int.length > 3 ? ',' : ''))
        : ''
      var _float = decimals
        ? stringified.slice(-1 - decimals)
        : ''
      var sign = value < 0 ? '-' : ''
      return sign + currency + head +
        _int.slice(i).replace(digitsRE, '$1,') +
        _float
    },
  }
}
</script>
<style lang="less">
.currency {
  display: inline-block;
  font-weight: 600;
}
</style>
