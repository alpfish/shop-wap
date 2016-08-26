import Vue from 'vue'
import VueResource from 'vue-resource'
import { API_ROOT } from 'src/config'

Vue.use(VueResource)

class Api{
  /**
   * [Api公共请求方法]
   * 通过回调函数返回搜索数据及错误回调
   *
   * @param Object params 请求参数
   * @param function success 成功回调
   * @param function errors  失败回调
   *
   * @return function success 成功回调
   * @return function errors  失败回调
   */
  request( params = {}, success, errors )
  {
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
      .then((response) => {     // 成功回调
        success(response.data)
      }
      ,(response) => {      // 错误回调
        errors(response)
      })
  }

  /**
   * 商品搜索
   */
  search( query={}, success, errors )
  {
    this.request (
      {
        url: 'goods/search',
        method: 'GET',
        data: query, // 查询对象参数包括{cid, keywords, ids, tag, page, per_page...}
      },
      (res) => {
        setTimeout(() => success(res), 100)
        console.log('===> 搜索商品')
      },
      (res) => {
        setTimeout(() => errors(res), 100)
        console.log('===> 搜索商品失败!', res)
      }
    )
  }

  /**
   * 获取商品类目树
   */
  getGoodsCategoryTree( success, errors )
  {
    this.request (
      {
        url: 'goods/category/tree',
        method: 'GET',
        data: {}
      },
      (res) => {
        setTimeout(() => success(res), 100)
        console.log('===> 获取类目树')
      },
      (res) => {
        setTimeout(() => errors(res), 100)
        console.log('===> 获取类目树失败!', res)
      }
    )
  }


}

export default new Api()
