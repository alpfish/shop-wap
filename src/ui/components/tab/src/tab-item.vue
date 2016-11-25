<template>
  <div class="vux-tab-item" :class="[currentSelected ? activeClass : '', {'vux-tab-selected': currentSelected}]" :style="style" @click="onItemClick">
    <slot></slot>
  </div>
</template>

<script>
import { getColor } from '../../../styles/_vars'
import { childMixin } from '../../../mixins/multi-items'

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
        color: this.currentSelected ? getColor(this.$parent.activeColor) : this.disabled ?  getColor(this.$parent.disabledColor) : getColor(this.$parent.defaultColor),
        border: this.$parent.animate ? 'none' : 'auto'
      }
    }
  }
}
</script>
