import Vue from 'vue'
import VueRouter from 'vue-router'
import store from 'src/vuex/store'
import Api from 'libs/api'

Vue.use(VueRouter)

const router = new VueRouter({
  transitionOnLoad: true
})

// 路由中间件
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

router.map({
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
