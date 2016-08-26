<template>
  <div class="page">
    <content>
      <div class="list-block media-list">
        <ul>
          <li v-for="p in goods">
            <a class="item-content item-button my-list-item">
              <div class="item-media my-li_img_wap">
                <img :src="IMG_ROOT + p.thumb" width="124">
              </div>
              <div class="item-inner">
                <span class="my-list-item-title">
                  {{ p.name }}
                </span>
                <p class="my-list-sold">
                  <small>销量：{{ p.sales }} 件</small>
                </p>
                <div class="my-list-tag">
                  {{ p.tag_prom || p.features  || "&nbsp" }}
                </div>
                <div class="my-list-price">
                  <small>¥ </small>
                  <strong>{{ p.price }}</strong>
                  <span class="my-list-sold"><small><del>{{ p.orig != '0.00' ? '¥'+p.orig : '' }}</del></small></span>
                  <i class="icon icon-cart pull-right"></i>
                </div>
              </div>
            </a>
          </li>
        </ul>
      </div>
    </content>
  </div>
</template>

<script>
import { IMG_ROOT } from 'src/config'
import { addToCart } from 'actions/cartActions'
import Content from 'vum/components/content'


export default{
  data: function() {
    return {
      IMG_ROOT: IMG_ROOT
    }
  },
  vuex: {
    getters: {
      goods: ({goodsList}) => goodsList.current
    },
    actions: {
      addToCart
    }
  },
  components: {
    Content
  }
}
</script>

<style scoped lang="less">
@import "../../../../assets/vum/components/variables.less";

.my-list-item-title {
  font-weight: normal;
  margin-top: 5px;
  padding: 0;
  font-size: 0.75rem;
  color: @color-text;
  line-height: 0.85rem;
  position: relative;
  overflow: hidden;
  max-height: 1.7rem;
  text-overflow:ellipsis;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  display: -webkit-box;
}
.my-list-sold {
  margin: 0.25rem 0;
  font-size: 0.6rem;
  color: @color-text-gray;
}
.my-list-tag {
  font-size: 0.6rem;
  color: @color-warning;
}
.my-list-price {
  margin-top: 0.25rem;
  font-size: 1rem;
  color: @color-danger-active;
}
</style>
