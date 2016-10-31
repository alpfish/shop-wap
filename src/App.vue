<template>
  <div>
    <loading place="page" :show="loading" color="brand" size="24px"></loading>
    <!-- <router-view
    :transition="'vux-pop-' + (direction === 'forward' ? 'in' : 'out')"
    ></router-view> -->
    <!-- kepp-alive 将使组件中的各生命周期钩子只在首次加载时有效, 可将个别必要相关逻辑移至路由切换钩子中 -->
    <!-- <router-view keep-alive></router-view> -->
    <router-view></router-view>
    <tabbar></tabbar>
  </div>
</template>

<script>
import store from './vuex/store'
import * as types from 'src/vuex/mutation-types'

import Tabbar from 'components/tabbar'
import { Loading } from './ui/components'

export default {
  store: store,
  components: {
    Loading,
    Tabbar,
  },
  vuex: {
    getters: {
      route: (state) => state.route,
      loading: (state) => state.app.loading,
      // direction: (state) => state.app.direction
    }
  },
  data () {
    return {
      // routerTransition: {
      //   forward: 'slideRL',
      //   back: 'slideLR'
      // },
    }
  },
  computed: {
    // isMember () {
    //   return /member/.test(this.route.path)
    // },
  },
  ready() {
  },
  created() {
    // 定义常量
    const width = document.body.clientWidth
    const height = document.body.clientHeight
    // 初始设置横竖屏
    let isLandscape = width > height ? true : false
    store.dispatch(types.UPDATE_LANDSCAPE, isLandscape)

    // 设置页面 rem 单位参照字号，屏幕的2倍宽高
    const setHtmlFontSize = function(){

      // 页面宽(可变)用 document.body.clientWidth
      // 设备宽(固定)用 window.screen.width * 2
      let width = document.body.clientWidth
      let height = document.body.clientHeight
      // 横竖屏统一宽度
      width = width < height ? width : height
      // 限制 rem 参照字号为 64px - 108px，设计参照为iPhone6 75px
      width = width < 640 ? 640 : width
      width = width > 1080 ? 1080 : width
      let html = document.documentElement
      // 须设置 body,html {height: 100%; width: 100%} 才有效
      html.style.setProperty('font-size', `${width*0.1}px`)
    }
    setHtmlFontSize()
    // 监视窗口调整, 不能在应用中的其他地方设置 window.onresize， 否则之前设置的失效
    window.onresize = () => {
      // setHtmlFontSize() // 开发时
      let nWidth = document.body.clientWidth
      let nHeight = document.body.clientHeight
      let inputing = nHeight < height && nWidth === width ? true : false
      let isLandscape = nWidth > width ? true : false
      store.dispatch(types.UPDATE_INPUTING, inputing)
      store.dispatch(types.UPDATE_LANDSCAPE, isLandscape)
    }
  }
}
</script>

<style lang="less">
@import './ui/styles/_vars.less';

body,html{
  width: 100%;
  height: 100%;
  overflow-x:hidden;
  overflow-y: auto;
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
