/*
  VueCookie
  https://github.com/alpfish/vue-cookie
  A Vue.js plugin for manipulating cookies

  Example

  import Vue from 'vue'
  import Cookie from 'libs/vendor/vue-cookie'

  Vue.use(Cookie)

  Cookie.set('my-cookie', 'Hello world!', 1);
  console.log('Cookie', Cookie.get('my-cookie'));
*/

(function () {

    var VueCookie = {

        install: function (Vue) {
            Vue.prototype.$cookie = this;
        },

        set: function (name, value, days) {
            var d = new Date;
            d.setTime(d.getTime() + 24*60*60*1000*days);
            window.document.cookie = name + "=" + value + ";path=/;expires=" + d.toGMTString();
        },

        get: function (name) {
            var v = window.document.cookie.match('(^|;) ?' + name + '=([^;]*)(;|$)');
            return v ? v[2] : null;
        },

        delete: function (name) {
            this.set(name, '', -1);
        }

    };

    if (typeof exports == "object") {
        module.exports = VueCookie;
    } else if (typeof define == "function" && define.amd) {
        define([], function(){ return VueCookie; })
    } else if (window.Vue) {
        window.VueCookie = VueCookie;
        Vue.use(VueCookie);
    }

})();
