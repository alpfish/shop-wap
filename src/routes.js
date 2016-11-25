// require.ensure 是 Webpack 的特殊语法，用来设置 code-split point
// （代码分块）
const Home = resolve => {
  require.ensure(['./views/home.vue'], () => {
      resolve(require('./views/home.vue'))
  })
}

// 这里还有另一种代码分块的语法，使用 AMD 风格的 require，于是就更简单了：
const NotFound =  resolve => require(['./views/404.vue'], resolve)

const routes = [{
  path: '/',
  component: Home
},{
  path: '/login',
  component: resolve => require(['./views/member/login.vue'], resolve)
},{
  path: '/member',
  meta: { auth: true }, // auth 表示路由需要认证
  component: resolve => require(['./views/member/index.vue'], resolve)
},{
  path: '/address',
  meta: { auth: true },
  component: resolve => require(['./views/member/address.vue'], resolve)
},{
  path: '/add-address',
  meta: { auth: true },
  component: resolve => require(['./views/member/address-add.vue'], resolve)
},{
  path: '/cart',
  component: resolve => require(['./views/cart/index.vue'], resolve)
},{
  path: '*',
  component: NotFound // '*'匹配404路由放在最后
}, ]

export default routes
