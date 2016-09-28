<!-- Badge -->
<template>
  <span v-text="text" :class="['vux-badge', {'vux-badge-single': text.length === 1}]" :style="style"></span>
</template>

<script>
import {getColor} from 'ui/style/_vars'

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
  }
}
</script>

<style lang="less">
@import '../../style/_vars.less';

.vux-badge {
  display: inline-block;
  text-align: center;
  color: #fff;
  font-size: 12px;
  height: 16px;
  line-height: 16px;
  border-radius: 8px;
  padding: 0 6px;
  background-clip: padding-box;
}
.vux-badge-single {
  padding: 0;
  width: 16px;
}
</style>
