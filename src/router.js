import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const router = new VueRouter({
  saveScrollPosition: true
})

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
    component: (resolve) => require(['views/member/index.vue'], resolve)
  },
  '/member/register': {
    name: 'register',
    component: (resolve) => require(['views/member/register.vue'], resolve)
  },
})

export default router
