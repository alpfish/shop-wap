<!-- Badge -->
<template>
  <span v-if="show" v-text="textFormat" :class="['vux-badge', {'vux-badge-single': text.length === 1}]" :style="style"></span>
</template>

<script>
import {getColor} from 'ui/styles/_vars'

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
@import '../../styles/index.less';

.vux-badge {
  display: inline-block;
  text-align: center;
  color: #fff;
  font-size: 12*2/75rem;
  text-align: center;
  // height: 18*2/75rem;
  line-height: 16*2/75rem;
  border: 2px solid #fff;
  border-radius: 9*2/75rem;
  padding: 0 6*2/75rem;
  background-clip: padding-box;
}
.vux-badge-single {
  padding: 0;
  width: 18*2/75rem;
}
</style>
