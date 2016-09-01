<template>
  <div class="mui-content">
    <div class="mui-row">
      <div class="mui-col-xs-3"  :class="{'active': type == 'sort'}" @click="sort('sort')">
        综合
      </div>
      <div class="mui-col-xs-3" :class="{'active': type == 'sd'}"  @click="sort('sd')">
        销量
      </div>
      <div class="mui-col-xs-3"  :class="{'active': type == 'pd' || type == 'pa'}"  @click="psort()">
        价格
        <div class="sort-arrow">
          <div class="triangle-bottom" :class="{'active': type === 'pa'}"></div>
          <div class="triangle-top" :class="{'active': type === 'pd'}"></div>
        </div>
      </div>
      <div class="mui-col-xs-3">
        筛选
      </div>
    </div>
  </div>
</template>

<style scoped lang="less">
  @import "../../../assets/styles/my-mui-variables.less";

  .mui-row {
    margin-bottom: 5px;
    height: 50px;
    font-size: 16px;
    line-height: 50px;
    text-align: center;
    box-shadow: 0 1px 6px #ccc;
  }
  .active {
    color: @color-brand;
  }
  .sort-arrow {
    display: inline-block;
    position: relative;;
    top: 6px;
  }
  .triangle-top,
  .triangle-bottom {
    margin: 2px auto;
    width: 0;
    height: 0;
    border: 4px solid transparent;
  }
  .triangle-top {
    border-top-color: @color-grey;
  }
  .triangle-bottom {
    border-bottom-color: @color-grey;
  }
  .triangle-top.active{
    border-top-color: @color-brand;
  }
  .triangle-bottom.active{
    border-bottom-color: @color-brand;
  }
</style>

<script type="text/babel">
  export default {
    data() {
      return {
        type: this.$route.query.sort ? this.$route.query.sort : 'sort',
        ptype: 'pd'
      }
    },
    methods: {
      sort(type) {
        this.type = type ? type : 'sort'
        let query = this.$route.query
        if (this.type === 'sd')   Object.assign(query, {sort: 'sd'})
        if (this.type === 'pa')   Object.assign(query, {sort: 'pa'})
        if (this.type === 'pd')   Object.assign(query, {sort: 'pd'})
        if (this.type === 'sort') delete query.sort// api 默认排序
        this.$dispatch('sort', query)
      },
      psort() {
        this.ptype = this.ptype === 'pd' ? 'pa' : 'pd'
        this.sort(this.ptype)
      }
    }
  }
</script>
