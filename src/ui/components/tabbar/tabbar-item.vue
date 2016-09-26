<template>
  <a href="javascript:;" class="weui_tabbar_item" v-waves>
    <div class="weui_tabbar_icon" :class="{'vux-reddot': dot, 'active': active}">
      <slot name="icon"></slot>
      <sup><badge v-if="badge" :text="badge"></badge></sup>
    </div>
    <p class="weui_tabbar_label" :class="{'active': active}">
      <slot name="label" ></slot>
    </p>
  </a>
</template>

<script>
import Vue from 'vue'
import VueWaves from 'ui/directive/waves'
Vue.use(VueWaves)

import Badge from '../badge'

export default {
  components: {
    Badge
  },
  props: {
    active: {
      type: Boolean,
      default: false
    },
    badge: String,
    dot: {
      type: Boolean,
      default: false
    },
  },
}
</script>
