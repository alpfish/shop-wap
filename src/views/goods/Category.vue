<template>
<span>
  <header class="mui-bar mui-bar-nav">
    <a class="mui-action-back mui-icon mui-icon-left-nav mui-pull-left"></a>
    <h1 class="mui-title">商品分类</h1>
  </header>
  <div class="mui-content mui-row mui-fullscreen" style="background-color: #fff">
    <!-- 左侧顶级类目 -->
    <div class="mui-col-xs-3">
      <div id="segmentedControls" class="mui-segmented-control mui-segmented-control-inverted mui-segmented-control-vertical"  style="background-color: #eee">
        <a class="mui-control-item" v-for="parent of categories | orderBy 'sort'" @click="setParentCid(parent.cid)">
          {{ parent.name }}
        </a>
      </div>
    </div>
    <!-- 右侧内容区 -->
    <div id="segmentedControlContents" class="mui-col-xs-9">
      <div class="mui-control-content mui-active">
        <ul class="mui-table-view mui-grid-view">
          <!-- 子类目循环放在 <ul> 标签上会增加性能负担，并且会有去不掉的分隔线，因单独放于一个 <div> 中 -->
          <div v-for="son of sons">
            <li class="mui-table-view-cell mui-col-xs-12">
              <div class="son-name">{{ son.name }}</div></li>
            <li class="mui-table-view-cell mui-media mui-col-xs-4"  v-for="end of son.end" v-if="end.pid == son.cid  || son.cid < 0">
              <a v-link="{name:'goods-list', query:{cid:end.cid}}">
                <img class="mui-media-object wap-img" :src="end.img || '../../../static/imgs/img_bg_120.gif'">
                <span class="mui-media-body">{{ end.name }}</span></a></li>
          </div>
        </ul>
      </div>
    </div>
  </div>
</span>
</template>

<script>
import {setGoodsCategoryTree} from 'actions/goodsCategoryActions'

export default {
  data() {
    return {
      parentCid: null
    }
  },
  computed: {
    parent: function(){
      if (! _.isEmpty(this.categories) && _.isNull(this.parentCid)) {
        return _.head(_.sortBy(this.categories,'sort'))
      }
      return _.head(_.sortBy(this.categories.filter( item => item.cid == this.parentCid ), 'sort'))
    },
    sons: function(){
      if (! _.isEmpty(this.parent)) {
        return this.parent.son
      }
    },
  },
  methods: {
    setParentCid: function(cid) {
      // this.parentCid = cid
      // 异步，防止 mui-active 这个 class 无用
      setTimeout( () => this.parentCid = cid, 0)
    }
  },
  ready() {
    if (_.isEmpty(this.categories)) {
      this.setGoodsCategoryTree()
    }
    mui.init({
      swipeBack: true //启用右滑关闭功能
    });
  },
  vuex: {
    getters: {
      categories: ({goodsCategory}) => goodsCategory.tree
    },
    actions: {
      setGoodsCategoryTree
    }
  }
}
</script>

<style>
  .son-name {
    color: #666;
    font-size: 0.7rem;
    text-align: left;
    line-height: 1.5rem;
  }
  /*图片背景*/
  .wap-img {
    position: relative;
    overflow: hidden;
    background: #fff url("../../../static/imgs/img_bg_120.gif") no-repeat center center;
    background-image: url("../../../static/imgs/img_bg_120.gif");
    background-size: 75%
  }

  .mui-table-view.mui-grid-view .mui-table-view-cell .mui-media-body{
    font-size: 15px;
    margin-top:8px;
    color: #333;
  }
  .mui-row.mui-fullscreen>[class*="mui-col-"] {
    height: 100%;
  }
  /*左侧滚动*/
  .mui-col-xs-3,
  .mui-control-content {
    overflow-y: auto;
    height: 100%;
  }
  /*左侧类目显示*/
  .mui-segmented-control .mui-control-item {
    line-height: 60px;
    width: 100%;
  }
  .mui-segmented-control.mui-segmented-control-inverted .mui-control-item.mui-active {
    background-color: #fff;
  }
</style>
