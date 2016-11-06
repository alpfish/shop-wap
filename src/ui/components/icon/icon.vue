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
      type: [String, Number],
      default: 48
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
        fontSize: typeof this.size === "string" ? this.size : `${this.size/75}rem`,
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
}
</style>
