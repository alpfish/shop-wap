<template>
    <div class="notfound">
        <icon name="404" color="gray" size="2rem"></icon>
        <p>非常抱歉，您所访问的网页找不到了！</p>
        <router-link to="/"><h3 class="link">返回首页</h3></router-link>
    </div>
</template>

<script>
import {Icon} from 'ui/components/icon'

export default {
  name: 'app',

  components: {
    Icon,
  },

}
</script>

<style scoped lang="less">
  @import "../ui/styles/_fn.less";

  .notfound {
    position: fixed;
    top: 25%;
    width: 100%;
    text-align: center;
    font-size: 14px;

    i {
      flex: 1;
    }
    p {
      color: @gray;
    }
    h3 {
      margin-top: 20px;
      color: @brand;
    }
  }


</style>
