<template>
<div class="list-item" :style="wrapStyles" @click="onClick">
  <!-- slot -->
  <div :style="itemStyles"><slot name="top"></slot></div>
  <div class="item-middle " :style="itemStyles" :class="{'vux-tap-active': arrow || !!link}">
      <div class="left">
        <!-- slot -->
        <slot name="left"></slot>
        <img v-if="img" :src="img" style="display: block; max-width: 36px; max-height: 36px; margin-right: 20px;">
        <icon v-if="icon" :name="icon" :size="36" :color="iconColor" style="margin-right: 20px"></icon>
        <span v-if="title" class="title">{{title}}</span>
      </div>
      <div class="body">
        <!-- slot -->
        <slot name="body"></slot><slot></slot>
      </div>
      <div class="right">
        <!-- slot -->
        <slot name="right"></slot>
        <span class="subtitle" v-if="subtitle" v-html="subtitle"></span>
        <span class="arrow" v-show="arrow || !!link"></span>
      </div>
  </div>
  <!-- slot -->
  <div :style="itemStyles"><slot name="bottom"></slot></div>
  <!-- line -->
  <div class="item-line" :style="lineStyles" v-if="line"></div>
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
    wrapStyles() {
      let styles = {}
      styles['background-color'] = this.bgcolor
      // 多个 item 之间的间距
      if (this.$parent.gutter) {
        styles['marginTop'] = typeof this.$parent.gutter === 'string' ? this.$parent.gutter : `${this.$parent.gutter}px`
      }
      // 由 List 组件设置高度 (在 ./style.less 中设置默认最小高度为 '44*2px')
      if (this.$parent.itemHeight) {
        styles['min-height'] = typeof this.$parent.itemHeight === 'string' ? this.$parent.itemHeight : `${this.$parent.itemHeight}px`
      }
      return styles
    },
    itemStyles() {
      let styles = {}
      // 由 List 组件设置 padding， (在 ./style.less 中设置的默认值为 '0 30px')
      styles['padding'] = this.$parent.itemPadding ? this.$parent.itemPadding : '0 30px'
      return styles
    },
    // 分隔线
    line() {
      return this.$parent.itemLine
    },
    // 分隔线左右空白
    lineStyles() {
      return {
        margin: this.$parent.itemLineSpace ? this.$parent.itemLineSpace : '0 0 0 30px',
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
