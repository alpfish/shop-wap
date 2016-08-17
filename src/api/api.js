import Vue from 'vue'
import VueResource from 'vue-resource'
import { API_ROOT } from 'src/config'

Vue.use(VueResource)

// api 请求函数
export default function(params) {
  params = Object(params)
  // 公共请求头
  Vue.http.options.headers = {
  }

  Vue
    .http({
      // 服务器地址
      root: API_ROOT,
      // api地址
      url: params.url || '',
      // 请求方法
      method: params.method || GET,
      // 参数
      params: params.data === Object(params.data) ? params.data : {},
      // 限时
      timeout: 5000,
    })

    // 成功回调
    .then((response) => {
      params.success(response)
    }

    // 错误回调
    ,(response) => {
      params.error(response)
    })
}
