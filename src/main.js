// 全局帮助函数
import _ from 'lodash/core'
import Vue from 'vue'
import store from 'src/vuex/store'
import Router from 'vue-router'
import RouterMap from 'src/router-map'
// import RouterConfig from 'src/router-config'
import FastClick from 'fastclick'

// 指令
// import BackLink from 'src/directives/back-link'
// Vue.directive('back-link', BackLink)

Vue.config.debug = true
Vue.use(Router)

let router = new Router({
  saveScrollPosition: true
})

router.map(RouterMap)

let App = Vue.extend({
  store
})

router.start(App, '#app')

// let rc = new RouterConfig(router)
// rc.config()
FastClick.attach(document.body)
