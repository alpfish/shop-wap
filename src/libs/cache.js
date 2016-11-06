/*
  VueCookie
  https://github.com/alpfish/vue-cookie
  A Vue.js plugin for manipulating cookies

  Example

  import Vue from 'vue'
  import Cache from 'libs/vendor/vue-cookie'

  Vue.use(Cache)

  // 直接使用
  Cache.set('test', 'Hello world!');

  // 在组件中

  this.$cache.set('test', 'Hello world!')
*/

import WebStorageCache from 'libs/vendor/web-storage-cache.js'
import VueCookie from 'libs/vendor/vue-cookie'

let LS = new WebStorageCache()
LS.deleteAllExpires();

(function () {

  var VueCache = {

    install: function (Vue) {
        Vue.prototype.$cache = this;
    },

    set (key, value, time = 365, to = { storage: true, cookie: true }) { // 按天, 可选ls还是cookie，默认两个一起
      if (to.storage) LS.set(key, value, { exp: 60 * 60 * 24 * time })
      if (to.cookie) VueCookie.set(key, value, time)
    },

    get (key) {
      return LS.get(key) ? LS.get(key) : VueCookie.get(key)
    },

    delete (key) {
      LS.delete(key)
      VueCookie.delete(key)
    },

    clear () {
      LS.clear()
    }

  }

  if (typeof exports == "object") { // import 后直接使用
      module.exports = VueCache;
  } else if (typeof define == "function" && define.amd) {
      define([], function(){ return VueCache; }) // new 使用
  } else if (window.Vue) { // 在组件中使用
      window.VueCache = VueCache;
      Vue.use(VueCache);
  }

})()
