// require.ensure 是 Webpack 的特殊语法，用来设置 code-split point
const Home = resolve => {
  require.ensure(['./views/home.vue'], () => {
      resolve(require('./views/home.vue'))
  })
}

const routes = [{
  path: '/',
  component: Home
}, {
  path: '*',
  component(resolve) {
      require.ensure(['./views/404.vue'], () => {
          resolve(require('./views/404.vue'));
      });
  }
}]

export default routes
