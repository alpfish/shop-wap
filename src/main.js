import _ from 'lodash'
import Vue from 'vue'
import VueRouter from 'vue-router'
import VueResource from 'vue-resource'
import FastClick from 'fastclick'
import App from './App'

// 自定义插件
import Cache from 'libs/cache'
import ToastPlugin from 'ui/plugins/toast'
// import Device from 'ui/plugins/device'

import * as filters from './filters'
import router from 'src/router'

FastClick.attach(document.body)

Vue.config.debug = true

Vue.use(Cache) // $cache
Vue.use(ToastPlugin) // $vux.toast
// Vue.use(Device) // $device


Vue.prototype.$shop = {
  
  header : {
    show: false,
    back: false,
    colse: false,
    title: '',
  }
}

// 过滤器
Object.keys(filters).forEach((k) => Vue.filter(k, filters[k]))

router.start(App, '#app')

// 全局
window.router = router
window.Vue = Vue
window.Cache = Cache
