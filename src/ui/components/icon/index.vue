<template>
  <i class="iconfont" :class="classNames" :style="{'font-size': size + 'px', 'color': color}"><slot></slot></i>
</template>

<script>
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
    }
  }
}
</script>

<style lang="css">
@import "../../../assets/iconfont/iconfont.css";

.icon{
  position: relative;
}
</style>
