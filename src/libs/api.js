import Vue from 'vue'
import LS from 'libs/local-storage'
import Cookie from 'libs/vendor/vue-cookie'
import {
  API_ROOT
} from 'src/config'
import VueResource from 'vue-resource'

Vue.use(Cookie)
Vue.use(VueResource)

// 内存缓存
let memory = new Map()

// 认证缓存键
const tokenKey = 'token'

// 响应拦截
Vue.http.interceptors.push((request, next) => {
  next((response) => {
    // 从 Authorization 头获取及缓存认证 token
    // 服务器端必须返回 'Access-Control-Expose-Headers:Authorization' 响应头，浏览器才能获取 Authorization 头。
    // https://github.com/vuejs/vue-resource/issues/215
    if ('Authorization' in response.headers) {
      // 双缓存, 避免浏览器或微信等环境失败
      LS.set(tokenKey, response.headers['Authorization'], {
        exp: 60 * 60 * 24 * 7
      })
      Cookie.set(tokenKey, response.headers['Authorization'], 7)
    }

    // BUG：https://github.com/vuejs/vue-resource/issues/317  新版本修复后去掉
    if ('Content-Type' in response.headers &&
      response.headers['Content-Type'] == 'application/json') {
      if (typeof response.data != 'object') {
        response.data = JSON.parse(response.data);
      }
    }

    if ('content-type' in response.headers &&
      response.headers['content-type'] == 'application/json') {
      if (typeof response.data != 'object') {
        response.data = JSON.parse(response.data);
      }
    }
  });
});

class Api {

  constructor(memory) {
    this.memory = memory
  }

  /**
   * [Api公共请求方法]
   * 通过回调函数返回搜索数据及错误回调
   *
   * @param Object params 请求参数
   * @param function success 成功回调
   * @param function error   失败回调
   *
   * @return function success 成功回调
   * @return function error   失败回调
   */
  request(options = {}, success, error) {
    let params = options.params === Object(options.params) ? options.params : {}

    // 返回认证 token
    // 使用 Authorization 头传送 token 会产生两次请求，故采用参数传送
    let token = LS.get(tokenKey) ? LS.get(tokenKey) : Cookie.get(tokenKey)
    if (token) {
      Object.assign(params, {
        'token': token
      })
    }

    Vue.http({
        // 服务器地址
        root: API_ROOT,
        // api地址
        url: options.url || '',
        // 请求方法
        method: options.method || 'GET',
        // 参数
        params: params,
        // 限时
        timeout: 5000,
      })
      // 成功回调
      .then((response) => {
        success(response.data)
      }, (response) => { // 错误回调
        error(response)
        let status = response.status
        if (status >= 500) {
          console.log(`服务器错误! status: ${status}  message: ${response.statusText}`);
        }
      })
  }

  /**
   * 商品搜索
   */
  search(query = {}, success, error) {
    let options = {
      url: 'goods/search',
      method: 'GET',
      params: query, // 查询对象参数包括{cid, keywords, ids, tag, page, per_page...}
    }

    let key = JSON.stringify(options)
    if (this.memory.has(key)) {
      setTimeout(() => success(this.memory.get(key)), 0)
    } else {
      this.request(
        options,
        (res) => {
          setTimeout(() => success(res), 0)
          this.memory.set(key, res)
          console.log('===> 搜索商品')
        },
        (res) => {
          setTimeout(() => error(res), 0)
          console.log('===> 搜索商品失败!', res)
        }
      )
    }
  }

  /**
   * 获取商品类目树
   */
  getGoodsCategoryTree(success, error) {
    let options = {
      url: 'goods/category/tree',
      method: 'GET',
      params: {}
    }
    let key = 'goods_category_tree'
    let value = LS.get(key)
    if (null !== value) {
      setTimeout(() => success(value), 0)
    } else {
      this.request(
        options,
        (res) => {
          setTimeout(() => success(res), 0)
          setTimeout(() => LS.set(key, res, {
            exp: 24 * 60 * 60
          }), 0)
          console.log('===> 获取类目树')
        },
        (res) => {
          setTimeout(() => error(res), 0)
          console.log('===> 获取类目树失败!', res)
        }
      )
    }
  }

}

export default new Api(memory)
