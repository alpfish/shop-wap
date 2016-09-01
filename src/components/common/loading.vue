<template>
<div class='loading'>
  <slot>加载中</slot>
  <p></p>
  <mt-spinner :type="2" color="rgb(100, 100, 100)" :size="30"></mt-spinner>
</div>
</template>

<style scoped>
  .loading {
      color: #777;
      text-align: center;;
      font-size: 0.8rem;
      margin-top: 20px;
      margin-bottom: 50px;
  }
</style>

<script>
  // mint-ui 加载动画组件，可指定显示类型、尺寸和颜色。
  // 使用 babel-plugin-component 自动导入样式文件及按需加载
  // 文档: http://mint-ui.github.io/docs/#!/zh-cn
  import Vue from 'vue'
  import { Spinner } from 'mint-ui';
  Vue.use( Spinner )

  export default {
    components: {
      mtSpinner: Spinner
    }
  }
</script>
