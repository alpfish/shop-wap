import Vue from 'vue';
import Toast from '../../components/toast/index.js';

export default {
  install (Vue, options) {
    if (!Vue.$toast) {
      Vue.$toast = Vue.prototype.$toast = Toast;
    }

    Vue.mixin({
      created: function () {
        this.$toast = Vue.$toast
      }
    })
  }
}
