<!-- Badge -->
<template>
  <span v-text="text" :class="['vux-badge', {'vux-badge-single': text.length === 1}]" :style="style"></span>
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
  }
}
</script>

<style lang="less">
@import '../../styles/index.less';

.vux-badge {
  display: inline-block;
  text-align: center;
  color: #fff;
  font-size: 24px;
  height: 32px;
  line-height: 32px;
  border-radius: 16px;
  padding: 0 12px;
  background-clip: padding-box;
}
.vux-badge-single {
  padding: 0;
  width: 16px;
}
</style>
