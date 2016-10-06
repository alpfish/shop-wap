<template>
<div :style="{ backgroundColor: bgcolor }">
  <div class="list-item" :style="styles" @click="onClick" :class="{'vux-tap-active': arrow || !!link}">
    <!-- slot left -->
    <div class="left">
      <slot name="left"></slot>
      <img v-if="img" :src="img" style="display: block; max-width: 18px; max-height: 18px; margin-right: 10px;">
      <icon v-if="icon" :name="icon" :size="18" :color="iconColor" style="margin-right: 10px"></icon>
      <span v-if="title" class="title">{{title}}</span>
    </div>
    <!-- slot 默认 -->
    <div class="body">
      <slot></slot>
    </div>
    <!-- slot right -->
    <div class="right">
      <span class="subtitle" v-if="subtitle" v-html="subtitle"></span>
      <slot name="right"></slot>
      <span class="arrow" v-show="arrow || !!link"></span>
    </div>
  </div>
  <!-- 分隔线 -->
  <div class="item-line" :style="lineStyles" v-show="line"></div>
</div>
</template>

<script>
import {
  go
} from '../../libs/router'
import {
  Icon
} from '../icon'

export default {
  components: {
    Icon,
  },
  props: {
    title: String, // 标题
    subtitle: String, // 子标题
    img: String, // 图片地址
    icon: String, // 图标
    iconColor: String, // 图标颜色
    link: [String, Object], // 链接
    arrow: Boolean, // 显示箭头
    // 背景色
    bgcolor: {
      type: String,
      default: '#fff'
    },
  },
  computed: {
    // 间距
    styles() {
      let styles = {}
      // 多个 item 之间的间距
      if (this.$parent.gutter) {
        styles['marginTop'] = typeof this.$parent.gutter === 'string' ? this.$parent.gutter : `${this.$parent.gutter}px`
      }
      // 由 List 组件设置 padding， (在 ./style.less 中设置的默认值为 '0 15px')
      if (this.$parent.itemPadding) {
        styles['padding'] = this.$parent.itemPadding
      }
      // 由 List 组件设置高度 (在 ./style.less 中设置默认最小高度为 '44px')
      if (this.$parent.itemHeight) {
        styles['height'] = typeof this.$parent.itemHeight === 'string' ? this.$parent.itemHeight : `${this.$parent.itemHeight}px`
      }
      return styles
    },
    // 分隔线
    line() {
      return this.$parent.itemLine
    },
    // 分隔线左右空白
    lineStyles() {
      return {
        margin: this.$parent.itemLineSpace ? this.$parent.itemLineSpace : '0 0 0 15px',
        marginTop: 0,
        marginBottom: 0,
      }
    },
    // 继承 label
    labelId() {
      return this.$parent.labelId ? this.$parent.labelId : ''
    },
  },
  methods: {
    onClick() {
      go(this.link, this.$router)
    }
  },
}
</script>

<style lang="less">@import "./style.less";
@import '../../styles/tap.less';</style>
