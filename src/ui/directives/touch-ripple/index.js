 /**
 *
 * from (https://github.com/surmon-china/vue-touch-ripple)
 *
 * import Vue from 'vue'
 * import TouchRipple from 'ui/directive/touch-ripple/index.js'
 *
 * Vue.use(TouchRipple)
 *
 * <button v-touch-ripple>check me!</button>
 * <h1 v-touch-ripple>I'm h1!</h1>
 */

var directive = require('../../components/touch-ripple/src/directive.js')

var touchRippleBuild = function(Vue) {
  // directive
  Vue.directive('touch-ripple', directive)
}

var TouchRipple = {
  install: function(Vue) {
    touchRippleBuild(Vue)
  }
}

module.exports = TouchRipple
