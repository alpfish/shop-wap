// 视图
export default {
  '*': {
    name: '404',
    component: (resolve) => require(['views/home/Home.vue'], resolve)
  },
  '/boot': {
    name: 'boot',
    component: (resolve) => require(['views/home/Boot.vue'], resolve)
  },
  '/': {
    name: 'home',
    component: (resolve) => require(['views/home/Home.vue'], resolve)
  },
  '/category': {
    name: 'category',
    component: (resolve) => require(['views/goods/CategoryView.vue'], resolve)
  },
  '/search': {
    name: 'search',
    component: (resolve) => require(['views/goods/Search.vue'], resolve)
  },
  'goods/list': {
    name: 'goods-list',
    component: (resolve) => require(['views/goods/ListView.vue'], resolve)
  },
  '/user': {
    name: 'user-home',
    component: (resolve) => require(['views/user/Home.vue'], resolve)
  },
}
