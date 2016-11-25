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
  Vue.$loading.hide()
  // (首次)进入页面后token自动登录
  if (!store.state.member.auth) {
    store.dispatch('tokenLogin')
  }
  // 加载购物车
  if (!store.state.cart.loaded || to.path == '/cart') {
    // 进入购物车加载数据是为了最大限度同步库存数
    // 使用延时防止与 token 登录或其他异步并发产生异常(如与tokenLogin放一起处理会比较麻烦)
    setTimeout(() => {
      store.dispatch('loadCart')
    }, 500)
  }
})

new Vue({
  store,
  router,
  el: '#app',
  render: h => h(App)
})
