<template>
  <div class="page-search">
    <mt-search :value.sync="value" :result="defaultResult | filterBy value"></mt-search>
  </div>
</template>

<style scoped lang="less">
  @import "../../../assets/styles/my-mui-variables.less";

  .page-search {
    height: 100%;
  }

</style>

<script type="text/babel">
  // mint-ui 无限加载组件
  // 使用 babel-plugin-component 自动导入样式文件及按需加载
  // 文档: http://mint-ui.github.io/docs/#!/zh-cn
  import Vue from 'vue'
  import { Search } from 'mint-ui'

  export default {
    data() {
      return {
        value: '',
        defaultResult: [
          'Apple',
          'Banana',
          'Orange',
          'Durian',
          'Lemon',
          'Peach',
          'Cherry',
          'Berry',
          'Core',
          'Fig',
          'Haw',
          'Melon',
          'Plum',
          'Pear',
          'Peanut',
          'Other'
        ]
      }
    },
    components: {
      MtSearch: Search
    }
  }
</script>
