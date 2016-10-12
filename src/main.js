import _ from 'lodash/core'
import Vue from 'vue'
import VueRouter from 'vue-router'
import VueResource from 'vue-resource'
import App from './App'

import FastClick from 'fastclick'
FastClick.attach(document.body)
Vue.config.debug = true

import * as filters from './filters'
Object.keys(filters).forEach((k) => Vue.filter(k, filters[k]))

import router from 'src/router'
router.start(App, '#app')
