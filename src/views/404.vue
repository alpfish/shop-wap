<style scoped lang="less">
  @import "../assets/styles/my-mui-variables.less";

  .not-found .link {
      color: @color-black;
  }
  .not-found .text {
      margin-top: 50px;
      text-align: center;
      font-size: 16px;
      line-height: 20px;
      color: #fff;
  }
  .not-found img {
      display: block;
      width: 60%;
      margin: 0 auto;
  }
  .not-found {
      padding: 150px 0 160px;
      height: 100%;
      background-color: @color-blue;
      overflow: hidden;
  }
  #main {
    position: fixed;
    top:0;
    right: 0;
    bottom: 0;
    left: 0;
  }


</style>

<template>

    <div id="main">
        <div class="not-found">
            <img src="http://echarts.baidu.com/images/404.png" alt="404">
            <div class="text">非常抱歉，您所访问的网页找不到了！
              <p></p>
              <p><a href="javascript:;" class="link" v-link="{name:'home'}">返回首页</a></p>
            </div>
        </div>
    </div>

</template>
