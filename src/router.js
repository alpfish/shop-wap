import Vue from 'vue'
import VueRouter from 'vue-router'
import Api from 'libs/api'


Vue.use(VueRouter)
const router = new VueRouter({
  transitionOnLoad: false
})

// sync router params
import { sync } from 'vuex-router-sync'
import store from 'src/vuex/store'

let history = window.sessionStorage
history.clear()
let historyCount = history.getItem('count') * 1 || 0
history.setItem('/', 0)

// 页面加载及过渡效果
const commit = store.commit || store.dispatch
router.beforeEach(({ to, from, next }) => {
  const toIndex = history.getItem(to.path)
  const fromIndex = history.getItem(from.path)
  if (toIndex) {
    if (toIndex > fromIndex) {
      commit('UPDATE_DIRECTION', 'forward')
    } else {
      commit('UPDATE_DIRECTION', 'reverse')
    }
  } else {
    ++historyCount
    history.setItem('count', historyCount)
    to.path !== '/' && history.setItem(to.path, historyCount)
    commit('UPDATE_DIRECTION', 'forward')
  }
  commit('UPDATE_LOADING', true)
  setTimeout(next, 0)
})
router.afterEach(() => {
  commit('UPDATE_LOADING', false)
})

// 路由认证中间件
router.beforeEach((transition) => {
  if (transition.to.auth) {
    // 身份认证
    if (!store.state.member.auth) {
      // token 验证&登录
      return Api.tokenLogin(
        (res) => {
          store.dispatch('SET_AUTH', res.data.member)
          transition.next()
        },
        (res) => {
          let redirect = encodeURIComponent(transition.to.path);
          transition.redirect('/member/login?redirect=' + redirect)
        }
      )
    } else {
      transition.next()
    }
  } else {
    transition.next()
  }
});

// 同步路由状态
sync(store, router)

router.map({
  'test': {
    name: 'test',
    component: (resolve) => require(['views/test.vue'], resolve)
  },
  '*': {
    name: '404',
    component: (resolve) => require(['views/404.vue'], resolve)
  },
  '/boot': {
    name: 'boot',
    component: (resolve) => require(['views/home/boot.vue'], resolve)
  },
  '/': {
    name: 'home',
    component: (resolve) => require(['views/home/index.vue'], resolve)
  },
  '/category': {
    name: 'category',
    component: (resolve) => require(['views/goods/category.vue'], resolve)
  },
  '/search': {
    name: 'search',
    component: (resolve) => require(['views/goods/search.vue'], resolve)
  },
  'goods/list': {
    name: 'goods-list',
    component: (resolve) => require(['views/goods/list.vue'], resolve)
  },
  '/cart': {
    name: 'cart',
    auth: true,
    component: (resolve) => require(['views/cart/index.vue'], resolve)
  },
  '/member': {
    name: 'member',
    auth: true,
    component: (resolve) => require(['views/member/index.vue'], resolve)
  },
  '/member/register': {
    name: 'register',
    component: (resolve) => require(['views/member/register.vue'], resolve)
  },
  '/member/login': {
    name: 'login',
    component: (resolve) => require(['views/member/login.vue'], resolve)
  },
})

export default router
