<template>
<a href="javascript:;" class="float-button" :class="classNames" :style="style" v-el:button>
  <icon :name="icon" :size="20*2"></icon>
  <ripple color="rgba(255, 255, 255, .3)" :trigger="$els.button"></ripple>
</a>
</template>

<script>
import icon from '../icon/icon'
import ripple from '../ripple'
import {getColor} from '../../styles/_vars'
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
@import "../../styles/_vars.less";
@import "../../styles/vue-carbon/_mixins.less";

.float-button{
  position: relative;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  line-height: 1;
  width: 45*2px;
  height: 45*2px;
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
  right: 16*2px;
  bottom: 16*2px;
}
</style>
