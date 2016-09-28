<template>
  <div>
    <loading place="page" :show="loading" color="brand" size="14px"></loading>
    <!-- <router-view
    :transition="'vux-pop-' + (direction === 'forward' ? 'in' : 'out')"
    ></router-view> -->
    <!-- 无过滤效果 -->
    <router-view></router-view>
  </div>
</template>

<script>
import store from './vuex/store'
import { ViewBox, Loading} from './ui/components'

export default {
  store: store,
  components: {
    ViewBox,
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
  }
}
</script>

<style lang="less">
@import './ui/style/_vars.less';

html, body {
  height: 100%;
  width: 100%;
  overflow-x: hidden;
}
body {
  background-color: @bg-body;
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
