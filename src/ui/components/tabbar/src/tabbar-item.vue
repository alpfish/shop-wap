<template>
  <a  @click="onItemClick" href="javascript:;" class="weui-tabbar__item" :class="{'weui-bar__item_on': active}">
    <div class="weui-tabbar__icon" :class="{'vux-reddot': dot}">
      <slot name="icon"><icon v-show="icon" :name="icon" size="20px"></icon></slot>
      <sup><badge v-if="badge" :text="badge"></badge></sup>
    </div>
    <p class="weui-tabbar__label"><slot name="label" >{{label}}</slot></p>
  </a>
</template>

<script>
import { Badge } from '../../badge/index.js'
import { Icon } from '../../icon/index.js'
import { go } from '../../../libs/router'

export default {
  components: {
    Badge,
    Icon,
  },
  props: {
    active: Boolean,
    link: [String, Object],
    icon: String,
    label: String,
    badge: [String, Number],
    dot: Boolean,
  },
  methods: {
    onItemClick() {
      go(this.link, this.$router)
    }
  },
}
</script>
