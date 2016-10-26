<template>
  <a href="javascript:;" class="weui_tabbar_item" @click="onItemClick">
    <div class="weui_tabbar_icon" :class="{'vux-reddot': dot, 'active': active}">
      <slot name="icon"><icon v-if="icon" :name="icon" :size="(44/75)+'rem'"></icon></slot>
      <sup><badge v-if="badge" :text="badge"></badge></sup>
    </div>
    <p class="weui_tabbar_label" :class="{'active': active}">
      <slot name="label" ><span v-if="label" v-text="label"></span></slot>
    </p>
  </a>
</template>

<script>
import Badge from '../badge'
import {Icon} from '../icon'
import { go } from '../../libs/router'

export default {
  components: {
    Badge,
    Icon,
  },
  props: {
    active: {
      type: Boolean,
      default: false
    },
    link: [String, Object],
    icon: String,
    label:String,
    badge: [String, Number],
    dot: {
      type: Boolean,
      default: false
    },
  },
  methods: {
    onItemClick() {
      go(this.link, this.$router)
    }
  },
}
</script>
