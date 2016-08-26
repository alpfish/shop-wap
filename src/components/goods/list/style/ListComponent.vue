<template>
  <h1>
    hELLO
  </H1>
  <!-- <div class="page">
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
  </div> -->
</template>

<script>
import { IMG_ROOT } from 'src/config'
//import { addToCart } from 'actions/cartActions'


export default{
  data: function() {
    return {
      IMG_ROOT: IMG_ROOT
    }
  },
  vuex: {
    getters: {
    },
    actions: {
      // addToCart
    }
  },
  components: {
  }
}
</script>

<style>

</style>
