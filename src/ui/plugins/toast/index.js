import Vue from 'vue';
import { MessageBox } from '../../components/message-box/index.js'
export default {
  install (Vue, options) {
    if (!Vue.$toast) {
      Vue.$messageBox = Vue.prototype.$messageBox = MessageBox
    }

    Vue.mixin({
      created: function () {
        this.$messageBox = Vue.$messageBox
      }
    })
  }
}
