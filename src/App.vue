<template>
  <div>
    <loading place="page" :show="loading" color="brand" size="24px"></loading>
    <!-- <router-view
    :transition="'vux-pop-' + (direction === 'forward' ? 'in' : 'out')"
    ></router-view> -->
    <!-- 无过滤效果 -->
    <router-view></router-view>
  </div>
</template>

<script>
import store from './vuex/store'
import { Loading } from './ui/components'

export default {
  store: store,
  components: {
    Loading,
  },
  vuex: {
    getters: {
      route: (state) => state.route,
      loading: (state) => state.app.loading,
      direction: (state) => state.app.direction
    }
  },
  // data () {
  //   return {
  //     routerTransition: {
  //       forward: 'slideRL',
  //       back: 'slideLR'
  //     }
  //   }
  // },
  computed: {
    isMember () {
      return /member/.test(this.route.path)
    },
  },
  ready() {
  },
  created() {
    // 设置rem 单位参照字号
    // <meta name="viewport" content="width=device-width*2, initial-scale=0.5, maximum-scale=0.5, minimum-scale=0.5, user-scalable=no">
    const setHtmlFontSize = function(){
      // 网页可见区域宽(可变)
      // console.log(document.body.clientWidth);
      // 屏幕分辨率宽度(固定)
      // console.log(window.screen.width);
      // let width = window.screen.width * 2
      // let height = window.screen.height * 2
      let width = document.body.clientWidth
      let height = document.body.clientHeight
      // 横竖屏统一宽度
      width = width < height ? width : height
      // 限制 rem 参照字号最小为64px, 开发时取消，以自适应桌面浏览器
      // width = width < 640 ? 640 : width
      // 限制参照字体最大为108px
      width = width > 1080 ? 1080 : width
      let html = document.documentElement
      let fontsize = `${width*0.1}px`
      html.style.setProperty('font-size', fontsize)
    }
    // 初始化
    setHtmlFontSize()
    // 监视窗口变化时调整参照字号
    // window.onresize = setHtmlFontSize
  }
}
</script>

<style lang="less">
@import './ui/styles/_vars.less';

html, body {
  height: 100%;
  width: 100%;
  overflow-x: hidden;
}
body {
  background-color: @bg-page;
}
/* v-r-transition, default is {forward: 'forward', back: 'back'}*/
.forward-enter, .forward-leave {
  transform: translate3d(-100%, 0, 0);
}
.back-enter, .back-leave {
  transform: translate3d(100%, 0, 0);
}
/**
* vue-router transition
*/
.vux-pop-out-transition,
.vux-pop-in-transition {
  width: 100%;
  animation-duration: 0.5s;
  animation-fill-mode: both;
  backface-visibility: hidden;
}
.vux-pop-out-enter,
.vux-pop-out-leave,
.vux-pop-in-enter,
.vux-pop-in-leave {
  will-change: transform;
  height: 100%;
  position: absolute;
  left: 0;
}
.vux-pop-out-enter {
  animation-name: popInLeft;
}
.vux-pop-out-leave {
  animation-name: popOutRight;
}
.vux-pop-in-enter {
  perspective: 1000;
  animation-name: popInRight;
}
.vux-pop-in-leave {
  animation-name: popOutLeft;
}
@keyframes popInLeft {
  from {
    transform: translate3d(-100%, 0, 0);
  }
  to {
    transform: translate3d(0, 0, 0);
  }
}
@keyframes popOutLeft {
  from {
    transform: translate3d(0, 0, 0);
  }
  to {
    transform: translate3d(-100%, 0, 0);
  }
}
@keyframes popInRight {
  from {
    transform: translate3d(100%, 0, 0);
  }
  to {
    transform: translate3d(0, 0, 0);
  }
}
@keyframes popOutRight {
  from {
    transform: translate3d(0, 0, 0);
  }
  to {
    transform: translate3d(100%, 0, 0);
  }
}
</style>
