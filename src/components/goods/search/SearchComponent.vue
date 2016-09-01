<template>
  <div class="page">
    <div class="search">
      <a class="close mui-action-back mui-icon mui-icon-arrowleft"></a>
      <div class="search-box">
        <div class="clearn mui-icon mui-icon-close"></div>
          <input type="search" v-model="keyword" autocomplete="off" placeholder="&nbsp;新款外套 秋上新">
        <div class="search-icon mui-icon mui-icon-search"></div>
      </div>
    </div>

    <div class="content">
      <div class="filtered mui-table-view" v-for="k in keywords" v-if="0">
        <div class="mui-table-view-cell">{{ k }}</div>
      </div>

      <div class="hotKeywords">
        <span class="hot-icon mui-icon-extra mui-icon-extra-trend"></span>热门搜索
        <div v-for="hot in hotKeywords">
          <div class="hot-keyword">{{ hot }}</div>
        </div>
      </div>
    </div>

  </div>
</template>

<style scoped lang="less">
  @import "../../../assets/styles/my-mui-variables.less";

  .page {
      position: fixed;
      top: 0;
      bottom: 0;
      right: 0;
      left: 0;
      font: 14px/1.5 arial;
      color: @color-grey;
      z-index: 999999;
      background-color: @color-grey-light;
  }
  .search {
    position: relative;
    // background-color: rgba(0,0,0,.85);
    background-color: fade(@color-black, 85%);
    box-shadow: 0 1px 3px #000;
    height: 50px;
  }
  .search-box {
      position: relative;
      margin-left: 40px;
      margin-right: 10px;
      padding: 5px 0 5px 6px;
      box-sizing: border-box;
      height: 100%;
  }
  .clearn {
    position: absolute;
    left: 15px;
    top: 17px;
    font-size: 20px;
    display: none;
  }
  .search-box>input {
    padding-left: 32px;
    padding-top: 13px;
    text-align: left;
    width: 100%;
    height: 100%;
    border: 0;
    outline: 0;
    color: #333;
    font-size: 16px;
    background-color: fade(#FFF, 95%);
    border-radius: 6px;
  }
  .search-icon {
    position: absolute;
    right: 8px;
    top: 10px;
    font-size: 30px;
  }
  .close {
      position: absolute;
      left: 5px;
      top: 10px;
      width: 50px;
      font-size: 30px;
      color: @color-grey-light;
      // color: #FFF;
  }

  .content {
    width: 85%;
    margin: 15px auto;
  }

  .hot-keyword {
    float: left;
    border: solid 1px #999;
    margin-right: 10px;
    margin-top: 10px;
    padding: 1px 5px;
    border-radius: 2px;
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
        keyword: '',
        keywords: [
          '大米',
          '牛奶',
          '太阳镜',
          '卷纸',
          '平板电脑',
          '小米手机',
          '短裤',
          '避孕套',
          '秒杀',
          '长袖t恤',
          '红米手机',
          'iPad',
          '玩具',
          '零食'
        ],
        hotKeywords: [
          '大米',
          '牛奶',
          '太阳镜',
          '卷纸',
          '平板电脑',
          '小米手机',
          '短裤',
          '避孕套',
          '秒杀',
          '长袖t恤'
        ]
      }
    },
    components: {
      MtSearch: Search
    }
  }
</script>
