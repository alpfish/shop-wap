<template>
  <span>

    <p v-for="p in goods | orderBy 'id'">
    {{ p.id}}
    <p></p><p></p><p></p><p></p>
    <p></p><p></p><p></p><p></p>
    <p></p><p></p><p></p><p></p>
    </p>
    <p v-if="!loaded">
      loading...
    </p>
    <p v-if="loaded && !loadedSuccess">
      服务器忙，请稍后再试...
    </p>
    <div v-if="moreQuery">
      <button @click="getMore">获取更多</button>
    </div>
  </span>
</template>

<script>
import {setGoodsList, addToGoodsList} from 'actions/goodsListActions'

export default {
  data() {
    return {
      query: this.$route.query,
    }
  },

  vuex: {
    getters: {
      goods:         ({goodsList}) => goodsList.searched.goods,
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
    moreQuery() {
      if (this.page * this.per_page < this.total) {
        let addQuery = {...this.query}
        addQuery.page = this.page + 1
        addQuery.per_page = this.per_page
        return addQuery
      }
      return false
    }
  },

  methods: {
    getMore() {
      this.addToGoodsList(this.moreQuery, this.query)
    }
  },

  ready() {
    this.setGoodsList(this.query)
  },
}

</script>
