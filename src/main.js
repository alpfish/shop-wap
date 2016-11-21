// lodash 67kb左右，生产环境可分离
import _ from 'lodash'
import Vue from 'vue'
import VueRouter from 'vue-router'
import VueResource from 'vue-resource'
import Cache from './libs/cache'
import App from './App'
import store from './store'
import routes from './routes'
import toast from 'ui/plugins/toast'
import loading from 'ui/plugins/loading'

Vue.use(VueRouter)
Vue.use(VueResource)
Vue.use(toast)
Vue.use(loading)

const router = new VueRouter({
  routes
})

router.beforeEach((to, from, next) => {
  Vue.$loading.show()
  // 认证路由
  if (to.matched.some(record => record.meta.auth) && !store.state.member.auth) {
    // token 登录失败则手动登录
    // 这里使用action: tokenLogin 中Api的 Promise
    // 一个 store.dispatch 在不同模块中可以触发多个 action 函数。
    // 在这种情况下，只有当所有触发函数完成后，返回的 Promise 才会执行。
    store.dispatch('tokenLogin')
    .then(() => next() )
    .then(() => {
      // 使用 replace 代替 next(), 解决后退异常
      router.replace({
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
  // TODO 加载购物车（未加载或进入购物车页面时）
  // if (!store.state.cart.loaded || to.name == 'cart') {
  //   loadCart(store)
  // }
})

new Vue({
  store,
  router,
  el: '#app',
  render: h => h(App)
})
