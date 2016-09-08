import _ from 'lodash/core'
import Vue from 'vue'
import VueRouter from 'vue-router'
import VueResource from 'vue-resource'
import FastClick from 'fastclick'

import store from 'src/vuex/store'
import router from 'src/router'

Vue.config.debug = true

let App = Vue.extend({
  store
})

router.start(App, '#app')

FastClick.attach(document.body)
