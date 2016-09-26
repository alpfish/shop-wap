<template>
  <ul class="mui-table-view" v-infinite-scroll="loadMore()" infinite-scroll-disabled="loading" infinite-scroll-distance="50">
    <li class="mui-table-view-cell mui-media" v-for="item in list" >
      <a href="javascript:;">
        <img class="mui-media-object mui-pull-left" :src="IMG_ROOT + item.thumb">
        <div class="mui-media-body">
          <div class='mui-ellipsis-2 item-name' v-text="item.name"></div>
          <div class="item-tag mui-ellipsis">{{ item.tag_prom || item.features  || "&nbsp;" }}</div>
          <p class="item-sales">{{ item.sales === '1' ? '&nbsp;' : "销量:"+item.sales+"件" }}</p>
          <div>
            <span class="item-price">¥{{ item.price }}</span>
            <span class="item-sales"><del>{{ item.orig != '0.00' ? '¥'+item.orig : '¥'+item.price }}</del></span>
            <div class="proBuy"><span class="mui-icon-extra mui-icon-extra-cart mui-pull-right cart"></span></div>
          </div>
        </div>
      </a>
    </li>
  </ul>
  <loading v-show="loading">加载中...</loading>
</template>

<style scoped lang="less">
  @import "../../../../ui/style/_vars.less";
  .mui-table-view:after, .mui-table-view:before {
    height: 0px;
  }
  .mui-table-view-cell {
    padding: 8px 10px;
  }
  .mui-media-object {
    line-height: 118px;
    max-width: 118px;
    height: 118px;
  }
  .mui-media-body {
    padding-left: 5px;
  }
  .mui-table-view-cell:after {
    left: 138px;
    background-color: @gray-light;
  }
  .item-name {
    margin-top: 5px;
    color: @black;
    font-size: 14px;
    line-height: 18px;
    height: 36px;
  }
  .item-tag {
    margin-top: 5px;
    font-size: 11px;
    color: @blue;
  }
  .item-sales {
    color: @gray;
    font-size: 11px;
    line-height: 15px;
    font-family: arial;
    margin-top: 5px;
  }
  .item-price {
    // color: lighten(@color-brand, 10%);
    color: darken(@brand-color, 1%);
    font-size: 16px;
    font-weight: 600;
  }
  .proBuy {
    top: 85px;
    position: absolute;
    right: 12px;
    display: block;
  }
  .cart {
    width: 36px;
    height: 36px;
    display: inline-block;
    border-radius: 20px;
    text-indent: 7px;
    line-height: 37px;
    background-color: @gray-light;
    color: #e8374d;
    overflow: hidden;
  }
  .cart:before {
    color: @brand-color;
    font-size: 22px;
}
</style>

<script type="text/babel">
  // mint-ui 无限加载组件
  // 使用 babel-plugin-component 自动导入样式文件及按需加载
  // 文档: http://mint-ui.github.io/docs/#!/zh-cn
  import Vue from 'vue'
  import { InfiniteScroll } from 'mint-ui'
  Vue.use( InfiniteScroll )

  import { IMG_ROOT } from 'src/config'
  import { Loading } from 'ui/components'

  export default {
    props: {
      list: {
        type: Array,
        required: true
      },
      loading: {
        type: Boolean,
        required: true
      },
      allLoaded: {
        type: Boolean,
        required: true
      }
    },

    data: function() {
      return {
        IMG_ROOT: IMG_ROOT
      }
    },

    methods: {
      loadMore() {
        if (!this.allLoaded) {
          this.$dispatch('load-more')
        }
      }
    },

    components: {
      InfiniteScroll,
      Loading
    },
  };
</script>
