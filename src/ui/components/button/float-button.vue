<template>
<a href="javascript:;" class="float-button" :class="classNames" :style="style" v-el:button>
  <icon :name="icon" :size="20"></icon>
  <ripple color="rgba(255, 255, 255, .3)" :trigger="$els.button"></ripple>
</a>
</template>

<script>
import icon from '../icon/icon'
import ripple from '../ripple'
import {getColor} from '../../style/_vars'
export default {
  props: {
    icon: {
      type: String,
      default: 'gouwuche'
    },
    fixed: {
      type: Boolean,
      default: false
    },
    color: {
      type: String,
      default: 'brand'
    }
  },
  components: {
    icon,
    ripple
  },
  computed: {
    classNames () {
      let className = {}
      className['float-button-fixed'] = this.fixed
      return className
    },
    style () {
      return {
         backgroundColor: getColor(this.color)
      }
    }
  }
}
</script>

<style lang="less">
@import "../../style/_vars.less";
@import "../../style/vue-carbon/_mixins.less";

.float-button{
  position: relative;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  line-height: 1;
  width: 45px;
  height: 45px;
  border: none;
  appearance: none;
  text-decoration: none;
  margin: 0;
  outline: 0;
  transition-duration: 300ms;
  transform: translate3d(0, 0, 0);
  border-radius: 50%;
  color: #FFF;
  .flex-shrink(0);
  .depth(2);
  &:active {
    .depth(3);
  }
  .active-highlight()
}

.float-button-fixed{
  position: fixed;
  right: 16px;
  bottom: 16px;
}
</style>
