<template>
<li :class="['list-item', {'weui-cell_access': arrow || !!link}]" :style="itemStyles" @click="onClick">
  <div class="list-item-top" :style="topBottomStyle"><slot name="top"></slot></div>
  <div class="list-item-middle" :style="middleStyles" :class="{'vux-tap-active': arrow || !!link}">
    <div class="list-item-left">
      <slot name="left"></slot>
      <span v-if="title" class="title">{{title}}</span>
    </div>
    <div class="list-item-body"><slot></slot></div>
    <div class="list-item-right">
      <slot name="right"></slot>
      <span class="subtitle" v-if="subtitle" v-html="subtitle"></span>
      <span class="arrow" v-if="arrow || !!link"></span>
    </div>
  </div>
  <div class="list-item-bottom" :style="topBottomStyle"><slot name="bottom"></slot></div>
  <div class="list-item-line" v-if="line" :style="lineStyles"></div>
</li>
</template>

<script>
import {
  go
} from '../../../libs/router'

export default {
  props: {
    // 背景色 (style.les s默认 #fff)
    bgcolor: String,
    // 标题
    title: String,
    // 子标题
    subtitle: String,
    // 链接
    link: [String, Object],
    // 显示箭头
    arrow: Boolean,
    // 统一设置子元素高度, (style.less默认 45px)
    height: [String, Number],
    // 子元素 padding, (style.less默认'0 15px')
    padding: [String, Number],
    // 分隔线
    line: {
      type: Boolean,
      default: true
    },
    lineSpace: {
      type: [Number, String],
      default: '0 0 0 15px'
    },
  },
  computed: {
    itemStyles() {
      let styles = {}
      // 多个 item 之间的间距
      if (this.$parent.gutter) {
        styles['marginTop'] = typeof this.$parent.gutter === 'string' ? this.$parent.gutter : `${this.$parent.gutter/75}rem`
      }
      if (this.bgcolor) {
        styles['backgroundColor'] = this.bgcolor
      }
      return styles
    },
    middleStyles() {
      let styles = {}
      if (this.height) {
        styles['min-height'] = typeof this.height === 'string' ? this.height : `${this.height/75}rem`
      }
      if (this.padding) {
        styles['padding'] = this.padding
      }
      return styles
    },
    topBottomStyle() {
      let styles = {}
      if (this.padding) {
        styles['padding'] = this.lineSpace
      }
      return styles
    },
    // 分隔线左右空白
    lineStyles() {
      return {
        margin: this.lineSpace,
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

<style lang="less">
@import "./style.less";
</style>
