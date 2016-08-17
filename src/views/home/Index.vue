<template>
  <div>
    <img class="loading" src="../../assets/images/loading.jpg">
  </div>
</template>
<script>
  export default {
    ready() {
      setTimeout(() => { // 此处为什么用 老式函数书写方式不行？
        this.$route.router.go({name: 'home'})
      }, 3000);
    }
  }
</script>

<style scoped lang='less'>
  .loading {
    width: 100%;
    height: 100%;
    margin: 0;
    padding: 0;
  }
</style>
