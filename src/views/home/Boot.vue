<template>
  <div>
    <!-- <img class="loading" src="../../assets/images/loading.jpg"> -->
    <div style="text-align: center; margin-top: 150px"><p style="margin: 0; padding: 0.2em 0.3em 0.2em 0"><img src="http://static.m.maizuo.com/v4/static/pure/image/global/loading/projector-d71dfe7c77.gif" alt="加载中..." style="zoom: 0.5"></p><p style="margin: 0; padding: 0.2em 0 0.2em 1em;font-size:12px;color: #777">正在加载，请稍候...</p></div>
  </div>
</template>
<script>
  export default {
    ready () {
      setTimeout(() => { // 此处为什么用 老式函数书写方式不行？
        this.$route.router.go({name: 'home'})
      }, 3000);
    }
  }
</script>

<style>
  .loading {
    width: 100%;
    margin: 0;
    padding: 0;
  }
</style>
