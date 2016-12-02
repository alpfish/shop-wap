// lodash 67kb左右，生产环境可分离
import _ from 'lodash'
import Vue from 'vue'
import VueRouter from 'vue-router'
import VueResource from 'vue-resource'
import App from './App'
import store from './store'
import routes from './routes'
import toast from 'ui/plugins/toast'
import loading from 'ui/plugins/loading'
import messageBox from 'ui/plugins/message-box'

import Cache from 'src/libs/cache'
import {
  TOKEN_KEY,
} from 'src/config'

Vue.use(VueRouter)
Vue.use(VueResource)
Vue.use(toast)  // $toast
Vue.use(loading) //$loading
Vue.use(messageBox) //$messageBox

const router = new VueRouter({
  routes
})

router.beforeEach((to, from, next) => {
  Vue.$loading.show()
  // 认证路由
  if (to.matched.some(record => record.meta.auth) && !store.state.member.auth) {
    // token 登录失败则手动登录
    // actions 只能接受一个参数？
    store.dispatch('tokenLogin', {
      success: () => next(),
      error: () => next({
            path: '/login',
            query: { redirect: to.fullPath }
      })
    })
  } else {
    next()
  }
})

router.afterEach(( to, from ) => {
  setTimeout(() => {
    Vue.$loading.hide()
  }, 300);
  // (首次)进入页面后token自动登录
  if (!store.state.member.auth) {
    store.dispatch('tokenLogin')
  }
  // 无 token 加载本地购物车( token 登录成功自动加载用户购物车)
  // 进入购物车加载同步库存数
  if ((!store.state.cart.loaded && !Cache.get(TOKEN_KEY)) || to.path == '/cart') {
    store.dispatch('loadCart')
  }
  // 一次性获取所有促销信息
  setTimeout(() => {
    store.dispatch('fetchPromotions')
  }, 2000);
})

new Vue({
  store,
  router,
  el: '#app',
  render: h => h(App)
})
