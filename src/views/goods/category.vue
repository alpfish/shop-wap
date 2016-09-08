<template>
<span>
  <header class="mui-bar mui-bar-nav">
    <a class="mui-action-back mui-icon mui-icon-left-nav mui-pull-left"></a>
    <h1 class="mui-title">商品分类</h1>
  </header>

  <div class="mui-content mui-row mui-fullscreen" style="background-color: #fff">
    <loading v-if="!sons">加载中</loading>
    <!-- 左侧 -->
    <div class="mui-col-xs-3">
      <div id="segmentedControls" class="mui-segmented-control mui-segmented-control-inverted mui-segmented-control-vertical" >
        <a v-for="parent of tree | orderBy 'sort'" @click='setPid(parent.cid)' :class="parent.cid === currentPid ? 'mui-active' : ''" class="mui-control-item">
          {{ parent.name }}</a></div></div>
    <!-- 右侧 -->
    <div class="mui-col-xs-9">
      <div class="mui-control-content mui-active">
        <ul v-for="son of sons" class="mui-table-view mui-grid-view">
          <li class="mui-table-view-cell mui-col-xs-12">
            <div class="son-name">{{ son.name }}</div></li>
            <li v-for="end of son.end" v-if="end.pid == son.cid  || son.cid < 0" class="mui-table-view-cell mui-media mui-col-xs-4">
              <a v-link="{name:'goods-list', query:{cid:end.cid}}">
                <img class="mui-media-object wap-img" :src="end.img || '../../../static/imgs/img_bg_120.gif'">
                <span class="mui-media-body">{{ end.name }}</span></a></li></ul></div></div>
  </div>
</span>
</template>

<script>
  import {setTree, setCurrentPid} from 'actions/goods-category'
  import Loading from 'components/common/loading'
  import ImagePlaceholder from 'components/common/image-placeholder'

  export default {
    computed: {
      parent: function() {
        return _.head (_.sortBy (this.tree.filter ( item => item.cid == this.currentPid ), 'sort'))
      },
      sons: function() {
        if (!_.isEmpty(this.parent)) {
          return this.parent.son
        }
      }
    },
    methods: {
      setPid: function(pid) {
        return setTimeout (() => this.setCurrentPid(pid), 0)
      }
    },
    vuex: {
      getters: {
        tree: ({goodsCategory}) => goodsCategory.tree,
        currentPid: ({goodsCategory}) => goodsCategory.currentPid
      },
      actions: {
        setTree,
        setCurrentPid
      }
    },
    ready() {
      if (_.isEmpty(this.tree)) {
        this.setTree()
        setTimeout(() => this.setCurrentPid(), 1500)
      }
      mui.init({
        swipeBack: true //启用右滑关闭功能
      });
    },
    components: {
      Loading,
      ImagePlaceholder
    }
  }
</script>

<style scoped lang="less">
  @import "../../assets/styles/my-mui-variables.less";

  .mui-icon {
    color: #000;
  }
  /*图片背景*/
  .wap-img {
    position: relative;
    overflow: hidden;
    background: #fff url("../../../static/imgs/img_bg_120.gif") no-repeat center center;
    background-image: url("../../../static/imgs/img_bg_120.gif");
    background-size: 75%
  }

  .mui-row.mui-fullscreen>[class*="mui-col-"] {
    height: 100%;
  }
  /*左右单独滚动*/
  .mui-col-xs-3,
  .mui-control-content {
    overflow-y: auto;
    height: 100%;
  }
  /*左侧类目显示*/
  .mui-segmented-control .mui-control-item {
    width: 100%;
    line-height: 60px;
    color: @color-black;
    background-color: @color-grey-light;
  }
  // 左侧激活类目颜色
  .mui-segmented-control.mui-segmented-control-inverted .mui-control-item.mui-active {
    border-left: 3px solid @color-brand;
  }
  // 去右侧分隔线
  .mui-table-view:before {
      height: 0;
  }
  .mui-table-view:after {
      height: 0;
  }
  .mui-table-view{
    margin-top: 0;
    margin-bottom: 0.5rem;
    font-size: 0.85rem;
    line-height: 0.95rem;
    color: @color-black;
  }
  .son-name {
    color: @color-grey;
    text-align: left;
    height: .7rem;
    font-size: .65rem;
    line-height: .7rem;
    padding-left: .3rem;
    border-left: 3px solid @color-grey;
  }
</style>
