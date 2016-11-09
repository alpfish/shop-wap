<!--
  ViewBox 借鉴于 vue-carbon content
  如果单纯地使用 flex 布局，中间部分滚动时与头/底分界处有明显的阴影，感觉很不流畅；
  头部和底部使用绝对定位， 自动计算高度，使中间部分能够完全显示。

  注：header bottom 内容目前不支持 fixed 固定定位
 -->
<template>
  <div class="page">
    <div class="page-header-box" id="page-header-box">
      <div class="page-header-content">
        <slot name="header"></slot></div></div>

    <div class="page-content" :style="style">
      <slot></slot></div>

    <div class="page-bottom" id="page-bottom">
      <slot name="bottom"></slot></div>

  </div>
</template>

<script>
export default {
  data() {
    return {
      // 自动计算头/底部遮住的高度
      headerHeight: 0,
      bottomHeight: 0,
    }
  },
  computed: {
    style() {
      return {
        paddingTop: `${this.headerHeight}px`, // 固定为 px 单位
        paddingBottom: `${this.bottomHeight + 20}px`
      }
    }
  },
  mounted () {
    this.headerHeight = parseInt(document.getElementById('page-header-box').clientHeight)
    this.bottomHeight = parseInt(document.getElementById('page-bottom').clientHeight)
  },
}
</script>

<style lang="less">

@import "../../../styles/_fn.less";

*,
*::before,
*::after{
  box-sizing: border-box;
}

html{
  line-height: 1.6;
  font-size: 62.5%;
}

body{
  font-family: Roboto,-apple-system,BlinkMacSystemFont,Segoe UI,Oxygen,Ubuntu,Cantarell,Fira Sans,Droid Sans,Helvetica Neue,sans-serif;
  background-color:  @bg-page;
  width: 100%;
  user-select: none;
  -webkit-user-select: none;
  font-size: 16px;
  line-height: 1.5;
  -webkit-tap-highlight-color:rgba(0, 0, 0, 0.5);
  color: @content-color;
}

body,html{
  overflow-x: hidden;
  overflow-y: auto;
  height: 100%;
}

a{
  text-decoration: none;
  color: #FF5252;
  user-select: none;
  -webkit-user-select: none;
}

.page {
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  display: flex;
  flex-direction: column;
  background-color: @bg-page;
  justify-content: center;
  align-items: flex-start;
}

.page-header-box {
  position: absolute;
  top: 0;
  width: 100%;
  z-index: 1;
  .page-header-content {
    position: relative;
    width: 100%;
  }
}

.page-content {
  width: 100%;
  flex: 1;
  overflow: auto;
  -webkit-overflow-scrolling: touch;
  position: relative;
}

.page-bottom {
  position: absolute;
  bottom: 0;
  width: 100%;
  z-index: 1;
}
</style>
