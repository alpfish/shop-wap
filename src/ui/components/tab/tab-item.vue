<template>
  <div class="vux-tab-item" :class="[selected ? activeClass : '', {'vux-tab-selected': selected}]" :style="style" @click="onItemClick">
    <slot></slot>
  </div>
</template>

<script>
import { getColor } from '../../styles/_vars'
import { childMixin } from '../../mixins/multi-items'

export default {
  mixins: [childMixin],
  props: {
    activeClass: String,
    disabled: Boolean
  },
  computed: {
    style () {
      return {
        borderWidth: this.$parent.lineWidth + 'px',
        borderColor: getColor(this.$parent.activeColor), //this.$parent.activeColor,
        color: this.selected ? getColor(this.$parent.activeColor) : this.disabled ?  getColor(this.$parent.disabledColor) : getColor(this.$parent.defaultColor),
        // color: this.selected ? this.$parent.activeColor : this.disabled ? this.$parent.disabledColor : this.$parent.defaultColor,
        border: this.$parent.animate ? 'none' : 'auto'
      }
    }
  }
}
</script>
