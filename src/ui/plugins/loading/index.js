import Vue from 'vue';

const LoadingComponent = Vue.extend(require('../../components/loading/index.js'));

let $vm

export default {
  install (Vue, options) {
    // 实例化组件
    if (!$vm) {
      $vm = new LoadingComponent({
        el: document.createElement('div')
      })
      document.body.appendChild($vm.$el)
    }

    // 插件操作控制组件方法
    const loading = {
      show (options) {
        if (typeof options === 'string') {
          $vm.text = options
        } else if (typeof options === 'object') {
          for (let i in options) {
            $vm[i] = options[i]
          }
        }
        $vm.place = 'page'
        $vm.show = true
      },
      hide () {
        $vm.show = false
      }
    }

    if (!Vue.$loading) {
      Vue.$loading = Vue.prototype.$loading = loading;
    }

    Vue.mixin({
      created: function () {
        this.$loading = Vue.$loading
      }
    })
  }
}
