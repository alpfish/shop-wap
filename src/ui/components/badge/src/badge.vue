<!-- Badge -->
<template>
  <span v-if="show" v-text="textFormat" :class="['vux-badge', {'vux-badge-single': text.length === 1}]" :style="style"></span>
</template>

<script>
import { getColor } from '../../../styles/_vars'

export default {
  props: {
    text: [String, Number],
    color:{
      type: String,
      default: 'red'
    }
  },
  data() {
    return {
      style: {
        background: getColor(this.color)
      }
    }
  },
  computed: {
    show() {
      return parseInt(this.text) > 0
    },
    textFormat() {
      return parseInt(this.text) < 1000 ? parseInt(this.text) : '1k+'
    }
  }
}
</script>

<style lang="less">

.vux-badge {
  display: inline-block;
  text-align: center;
  color: #fff;
  font-size: 12px;
  text-align: center;
  height: 16px;
  line-height: 16px;
  // border: 2px solid #fff;
  border-radius: 10px;
  padding: 0 6px;
  background-clip: padding-box;
}
.vux-badge-single {
  padding: 0;
  width: 16px;
}
</style>
