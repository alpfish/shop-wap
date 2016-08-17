import Vue from 'vue'
import Router from 'vue-router'
import RouterMap from 'src/router-map'
import RouterConfig from 'src/router-config'
import store from 'src/vuex/store'
import FastClick from 'fastclick'


// 指令
import BackLink from 'src/directives/back-link'

// Vum : Base
import Base from 'vum/components'

Vue.config.debug = true

Vue.use(Router)

Vue.directive('back-link', BackLink)

let App = Vue.extend({
  store,
  components: {
    Base
  }
})

let router = new Router({
})

router.map(RouterMap)

router.start(App, '#app')

let rc = new RouterConfig(router)
rc.config()

FastClick.attach(document.body)
