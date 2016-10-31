<template>
<li class="list-item-wrap" :style="wrapStyles" @click="onClick">
  <div class="list-item" :style="itemStyles" :class="{'vux-tap-active': arrow || !!link}">
      <div class="left">
        <slot name="left"></slot>
        <icon v-if="icon" :name="icon" :size="40" :color="iconColor" style="margin-right: 10px"></icon>
        <span v-if="title" class="title">{{title}}</span>
      </div>
      <div class="body">
        <slot></slot>
      </div>
      <div class="right">
        <slot name="right"></slot>
        <span class="subtitle" v-if="subtitle" v-html="subtitle"></span>
        <span class="arrow" v-if="arrow || !!link"></span>
      </div>
  </div>
  <div class="item-line" v-if="line" :style="lineStyles"></div>
</li>
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
    icon: String, // 图标
    iconColor: String, // 图标颜色
    link: [String, Object], // 链接
    arrow: Boolean, // 显示箭头
    // 统一设置子元素高度, (子元素中默认设置44px)
    height: {
      type: [String, Number],
      default: `${100/75}rem`
    },
    // 子元素 padding, (子元素中默认设置为 '0 15px')
    padding: {
      type: [String, Number],
      default: `0 ${30/75}rem`
    },
    // 分隔线
    line: {
      type: Boolean,
      default: true
    },
    lineSpace: {
      type: [Number, String],
      default: `0 0 0 ${30/75}rem`
    },
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
        styles['marginTop'] = typeof this.$parent.gutter === 'string' ? this.$parent.gutter : `${this.$parent.gutter/75}rem`
      }
      styles['min-height'] = typeof this.height === 'string' ? this.height : `${this.height/75}rem`
      return styles
    },
    itemStyles() {
      let styles = {}
      styles['padding'] = this.padding
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

<style lang="less">@import "./style.less";
@import '../../styles/tap.less';</style>
