<!-- Loading -->
<template>
  <div v-show="show" :class="loadingClass">
    <spinner type="android" :color="color" :size="size"></spinner>
    <span class="loading-text"><slot>{{text}}</slot></span>
  </div>
</template>

<script>
import { Spinner } from '../../spinner/index.js'
import { getColor } from '../../../styles/_vars'

export default {
  components: {
    Spinner,
  },
  props: {
    show: Boolean,
    text: String,
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
  },
  computed: {
    loadingColor() {
      return getColor(this.color)
    },
    loadingClass () {
      return {
        'loading-row': this.place == 'row',
        'loading-page': this.place == 'page',
        'loading-inline': this.place == 'inline'
      }
    },
  }
}
</script>

<style lang="less">

  .loading-page, .loading-row {
    margin: 15px 0;
    width: 100%;
    text-align: center;
  }
  .loading-page{
    position: fixed;
    z-index: 50000;
    top: 40%;
  }
  .loading-inline {
    display: inline;
  }
  .loading-text{
    color: #666;
    font-size: 12px;
  }

</style>
