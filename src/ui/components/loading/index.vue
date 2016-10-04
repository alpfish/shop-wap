<!-- Loading -->
<template>
<div v-show="show" :style="pageMasker">
  <div :class="{'loading-inline': place == 'inline', 'loading-row': place == 'row', 'loading-page': place == 'page'}">
    <beat :color="loadingColor" :size="size"></beat>
    <!-- <clip :color="getColor" size="35px"></clip> -->
    <!-- <spinner type="ripple"></spinner> -->
    <p class="loading-text" v-show="place !='inline'"><slot></slot></p>
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
      default: '12px'
    },
  },
  computed: {
    loadingColor() {
      return getColor(this.color, 0.9)
    },
    pageMasker () {
      if (this.place == 'page') {
        return {
          position: 'absolute',
          top: 0,
          left: 0,
          bottom: 0,
          right: 0,
          zIndex: 999,
          backgroundColor: 'rgba(255,255,255,0.5)',
          // backgroundColor: 'rgba(0,0,0,0.1)',
        }
      }
    },
  }
}
</script>

<style scoped lang="less">
@import "../../styles/_vars.less";

.loading-inline {
  display: inline-block;
  padding: 2px;
  text-align: center;
}
.loading-row {
  padding-top: 30px;
  padding-bottom: 50px;
  text-align: center;
}
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
  font-size: 10px;
  color: @gray;
  margin-top: 10px;
  text-align: center;
}
</style>
