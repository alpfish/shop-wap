<template>
  <h1>HOME</h1>
  <a v-link="{name: 'home'}">
    首页
  </a>
  <a v-link="{name: 'category'}">
    分类
  </a>
  <a v-link="{name: 'search'}">
    搜索
  </a>
  <a v-link="{name: 'member'}">
    我的
  </a>
</template>

<script>
export default {
  components: {
  }
}
</script>
