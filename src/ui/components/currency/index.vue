<!-- Currency 货币组件 -->
<template>
  <span class="currency">
    <span v-text="currency" :style="smallStyle"></span><span v-text="head" :style="bigStyle"></span><span v-text="foot" :style="smallStyle"></span>
  </span>
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
      default: `${30/75}rem`
    },
    floatSize: {
      type: [String, Number],
      default: `${24/75}rem`
    }
  },
  computed: {
    head () {
      let stringified = this.format(this.value, this.currency, this.decimals)
      return this.decimals
        ? stringified.slice(1, -this.decimals) // 货币符号单独设置格式
        : stringified
    },
    foot () {
      let stringified = this.format(this.value, this.currency, this.decimals)
      return this.decimals
        ? stringified.slice(-this.decimals)
        : ''
    },
    bigStyle () {
      return {
        'font-size': typeof this.size === 'string' ? this.size : `${this.size/75}rem`,
        'color': getColor(this.color),
      }
    },
    smallStyle () {
      return {
        'font-size': typeof this.floatSize === 'string' ? this.floatSize : `${this.floatSize/75}rem`,
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
  font-weight: 400;
}
</style>
