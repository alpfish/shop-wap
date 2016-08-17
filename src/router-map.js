// 视图
export default {
  '/': {
    name: 'index',
    component: (resolve) => require(['views/home/Index.vue'], resolve)
  },

  // 404 路由
  '*': {
    name: 'index',
    component: (resolve) => require(['views/home/Index.vue'], resolve)
  },

  '/home': {
    name: 'home',
    component: (resolve) => require(['views/Home.vue'], resolve)
  },

  '/category': {
    name: 'category',
    component: (resolve) => require(['views/goods/Category.vue'], resolve)
  },

  '/search': {
    name: 'search',
    component: (resolve) => require(['views/goods/Search.vue'], resolve)
  },

  '/user': {
    name: 'user-home',
    component: (resolve) => require(['views/user/Home.vue'], resolve)
  }
}
