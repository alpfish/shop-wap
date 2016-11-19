import _ from 'lodash' // 67kb左右，生产环境可分离
import Vue from 'vue'
import VueRouter from 'vue-router'
import VueResource from 'vue-resource'
import App from './App'
import routes from './routes'
import loading from 'ui/plugins/loading'
import toast from 'ui/plugins/toast'

Vue.use(VueRouter)
Vue.use(VueResource)
Vue.use(loading)
Vue.use(toast)

const router = new VueRouter({
  routes
})

new Vue({
  router,
  el: '#app',
  render: h => h(App)
})

window.Vue = Vue
