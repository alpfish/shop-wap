<template>
  <div class="toast" :style="{'z-index': zIndex}" :class="{'toast-center': center}" transition="toast">
    <slot>
      <icon v-if="icon" :name="icon" :size="36*2"></icon>
      <circular v-if="loading && !icon" color="white"></circular>
      <div class="toast-text">{{text}}</div>
    </slot>
  </div>
</template>

<script>
import Icon from '../icon/icon.vue'
export default {
  data () {
    return {
      zIndex: 101
    }
  },
  props: {
    center: {
      type: Boolean,
      default: false
    },
    text: {
      type: String,
      default: ''
    },
    icon: {
      type: String,
      default: ''
    },
    loading: {
      type: Boolean,
      default: false,
    }
  },
  components: {
    Icon,
  }
}
</script>

<style lang="less">
.toast{
  position: fixed;
  left: 50%;
  bottom: 50*2px;
  max-width: 80%;
  border-radius: 5*2px;
  background: rgba(0, 0, 0, 0.7);
  color: #fff;
  text-align: center;
  padding: 10*2px;
  z-index: 1000;
  transform: translate3d(-50%, 0, 0);
  .toast-text{
    font-size: 16*2px;
    display: block;
    text-align: center;
  }
  &.toast-center {
    top: 50%;
    bottom: auto;
    transform: translate3d(-50%, -50%, 0);
  }
}
.toast-transition {
  -webkit-transition: opacity .3s linear;
  transition: opacity .3s linear;
  &.toast-enter,
  &.toast-leave {
    opacity: 0;
  }
}
</style>
