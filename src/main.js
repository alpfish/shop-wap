import _ from 'lodash'
import Vue from 'vue'
import VueRouter from 'vue-router'
import VueResource from 'vue-resource'
import FastClick from 'fastclick'
import App from './App'

import ToastPlugin from 'ui/plugins/toast'
// import Device from 'ui/plugins/device'
Vue.config.debug = true

FastClick.attach(document.body)

// $device
// Vue.use(Device)
Vue.use(ToastPlugin)

import * as filters from './filters'
Object.keys(filters).forEach((k) => Vue.filter(k, filters[k]))

import router from 'src/router'
router.start(App, '#app')
