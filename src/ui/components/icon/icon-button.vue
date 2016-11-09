<template>
<button class="icon-button" :style="style" :disabled="disabled" v-el:button>
  <icon v-if="icon" :name="icon" :size="36"></icon>
  <!-- <ripple :trigger="$els.button" v-if="!disabled"></ripple> -->
</button>
</template>

<script>
// import Ripple from '../ripple'
import Icon from '../icon/icon'
import {
  getColor
} from 'ui/styles/_vars'

export default {
  components: {
    Icon,
    // Ripple
  },
  props: {
    icon: String,
    color:String,
    fill: Boolean,
    disabled: Boolean,
  },
  computed: {
    style() {
      let bgColor = getColor(this.color)
      let style = {
        color: getColor('semi'),
        backgroundColor: 'none',
      }
      // 颜色填充
      if (this.fill  && getColor(this.color)) {
        style['color'] = getColor('white')
        style['backgroundColor'] = bgColor
      }
      // 彩色文字
      if (!this.fill && getColor(this.color)) {
        style['color'] = getColor(this.color)
        style['backgroundColor'] = 'none'
      }
      return style
    }
  },

}
</script>

<style lang="less">
@import "../../styles/_vars.less";
// @import "../../styles/vue-carbon/_mixins.less";
.icon-button {
    color: @semi;
    position: relative;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    line-height: 1;
    width: 40px;
    height: 40px;
    background: none;
    border: none;
    appearance: none;
    background: none;
    text-decoration: none;
    margin: 0;
    padding: 0;
    outline: 0;
    transition-duration: 300ms;
    transform: translate3d(0, 0, 0);
    border-radius: 100%;
    // .flex-shrink(0);
    &:active {
        background-color: rgba(0, 0, 0, 0.2);
    }
    .ripple-ink { // 点击水波
        color: rgba(255,255,255,0.4);
        // color: rgba(0, 0, 0, 0.2);
    }
}
</style>
