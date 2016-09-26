<template>
<header class="mui-bar mui-bar-nav">
  <div class="mui-row">
    <div class="mui-col-xs-3">
      <a class="mui-action-back mui-pull-left mui-icon mui-icon-left-nav"></a>
    </div>
    <div class="mui-col-xs-6">
      <span class="mui-icon mui-icon-search"></span>
    </div>
    <div class="mui-col-xs-3">
      <span class="mui-pull-right mui-icon mui-icon-bars"></span>
    </div>
  </div>
</header>
</template>

<style scoped lang="less">
@import "../../../ui/style/_vars.less";

.mui-action-back {
    color: #000;
}
.mui-bar {
    background-color: lighten(@gray-light, 4%);
    box-shadow: 1px 1px 0 @gray-light;
}
.mui-row {
    text-align: center;
}
</style>
