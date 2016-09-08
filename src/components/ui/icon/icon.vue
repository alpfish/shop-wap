<template>
  <i class="iconfont" :class="classNames" :style="{'font-size': size + 'px'}"><slot></slot></i>
</template>

<script>

 /**
  * icon
  * @module components/ui/icon/icon
  *
  * 字体图标及样式&名称来源于 iconfont.cn
  *
  * @param {string} name - 图标名称
  * @param {string} [size=24] - 图标大小: px
  *
  * @example
  * <icon :size="18" name="gouwuche">
  */
export default {
  props: {
    name: {
      type: String,
      default: ''
    },
    size: {
      type: Number,
      default: 24
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
