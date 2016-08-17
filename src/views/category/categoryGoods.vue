<template>
  <span>
    <list></list>
  </span>
</template>

<script>
import list from 'components/goods/list/style/list'
import {setGoodsListCurrent} from 'actions/goodsListActions'

export default{
  components: {
    list
  },
  vuex: {
    actions: {
      setGoodsListCurrent
    }
  },
  // ready() => this.getGoods({ cid: 105 })
  ready() {
    this.setGoodsListCurrent({
      cid: 0
    })
  }
}
</script>
