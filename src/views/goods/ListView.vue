<template>
  <div class="mui-content">
    <top-nav></top-nav>
    <sort @sort="setGoodsList"></sort>
    <list :list="goods" :loading="!loaded" :all-loaded="!hasMore" @load-more="getMore"></list>
    <p v-if="loaded && !loadedSuccess">服务器忙，请稍后再试...</p>
  </div>
</template>

<script>
  import TopNav from 'components/goods/list/TopNavComponent'
  import Sort from 'components/goods/list/TopSortComponent'
  import List from 'components/goods/list/style/ListComponent'
  import {setGoodsList, addToGoodsList} from 'actions/goodsListActions'

  export default {
    vuex: {
      getters: {
        goods:         ({goodsList}) => Array.from(goodsList.searched.goods),
        total:         ({goodsList}) => goodsList.searched.total,
        page:          ({goodsList}) => goodsList.searched.page,
        per_page:      ({goodsList}) => goodsList.searched.per_page,
        loaded:        ({goodsList}) => goodsList.loaded,
        loadedSuccess: ({goodsList}) => goodsList.loadedSuccess,
      },
      actions: {
        setGoodsList,
        addToGoodsList,
      }
    },

    computed: {
      hasMore() {
        return !!this.addQuery;
      },
      addQuery() {
        if (this.page * this.per_page < this.total) {
          let query = {...this.$route.query}
          query.page = this.page + 1
          return query
        }
        return false
      }
    },

    methods: {
      getMore() {
        this.addToGoodsList(this.addQuery)
      }
    },

    ready() {
      this.setGoodsList(this.$route.query)
    },

    components: {
      TopNav,
      Sort,
      List,
    }
  }
</script>

<style scoped lang="less">
  @import "../../assets/styles/my-mui-variables.less";
</style>
