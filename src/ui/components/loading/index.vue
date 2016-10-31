<!-- Loading -->
<template>
<div v-show="show" :style="style">
  <div :class="{'loading-page': place == 'page'}">
    <beat :color="loadingColor" :size="size"></beat>
    <!-- <clip :color="loadingColor" size="35px"></clip> -->
    <!-- <spinner type="ripple"></spinner> -->
    <span class="loading-text" v-show="place !='inline'"><slot></slot></span>
  </div>
</div>
</template>

<script>
import Beat from './loader/beat'
// import Clip from './loader/clip'
// import Spinner from '../spinner'
import { getColor } from '../../styles/_vars'

export default {
  components: {
    Beat,
    // Clip,
    // Spinner,
  },
  props: {
    show: {
      type: Boolean,
      default: true,
    },
    place: {
      type: String,
      default: 'row' // inline, row, page
    },
    color: {
      type: String,
      default: 'brand'
    },
    size: {
      type: String,
      default: '24px'
    },
    margin: {
      type: String,
      default: '40px auto'
    },
  },
  computed: {
    loadingColor() {
      return getColor(this.color)
    },
    style () {
      if (this.place == 'inline') {
        return {
          display: 'inline-block'
        }
      }
      if (this.place == 'row') {
        return {
          margin: this.margin
        }
      }
      if (this.place == 'page') {
        return {
          // 遮罩层
          position: 'absolute',
          top: 0,
          left: 0,
          bottom: 0,
          right: 0,
          zIndex: 999,
          // backgroundColor: 'rgba(255,255,255,0.5)',
          // backgroundColor: 'rgba(0,0,0,0.1)',
        }
      }
    },
  }
}
</script>

<style lang="less">

.loading-page {
  position: fixed;
  left: 50%;
  top: 50%;
  bottom: auto;
  transform: translate3d(-50%, -50%, 0);
  z-index: 1000;
}
.loading-text{
  display: block;
  font-size: 20px;
  margin-top: 20px;
  text-align: center;
}
</style>
