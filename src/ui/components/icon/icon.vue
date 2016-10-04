<template>
  <i class="iconfont" :class="classNames" :style="style"><slot></slot></i>
</template>

<script>
import {getColor} from 'ui/styles/_vars'
export default {
  props: {
    name: {
      type: String,
      default: ''
    },
    size: {
      type: Number,
      default: 24
    },
    color: {
      type: String,
      default: ''
    }
  },
  computed: {
    classNames () {
      let obj = {}
      obj['icon-' + this.name] = true
      return obj
    },
    style () {
      return {
        fontSize: `${this.size}px`,
        color: getColor(this.color)
      }
    }
  }
}
</script>

<style lang="css">
@import "../../../assets/iconfont/iconfont.css";

.iconfont {
  position: relative;
  font-weight: 100;
}
</style>
