<template>
  <li :class="['weui-cell', {'weui-cell_access': arrow || !!link}]"  @click="onClick">
    <div class="weui-cell__hd">
      <slot name="left">{{title}}</slot>
    </div>
    <div class="weui-cell__bd weui_cell_primary">
      <slot></slot>
    </div>
    <div class="weui-cell__ft">
      <slot name="right"></slot>
    </div>
  </li>
</template>

<script>
import {
  go
} from '../../../libs/router'

export default {
  props: {
    title: String, // 标题
    link: [String, Object], // 链接
    arrow: Boolean, // 显示箭头
  },
  methods: {
    onClick() {
      go(this.link, this.$router)
    }
  },
}

</script>
