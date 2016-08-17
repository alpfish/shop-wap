import api from 'api/api'

export default {

  /**
   * [商品搜索]
   * 通过回调函数返回搜索数据
   */
  search: function(query, callback, errback) {
    query = Object(query)

    // console.log('===> 商品 searchApi.query', {
    //   ids: query.ids,
    //   cid: query.cid,
    //   tag: query.tag,
    //   keywords: query.keywords,
    // });

    api({
      url: 'goods/search',
      method: 'GET',
      data: {
        // 需要获取的商品 id 数组
        ids: [],
        // 搜索类目id
        cid: query.cid || 0,
        // 搜索关键词
        keywords: query.keywords || null,
        // 搜索标签 (如：广告商品，推荐商品，猜你喜欢，热销，秒杀...)
        tag: query.tag || null
      },
      success: (res) => {
        // 返回商品数据
        setTimeout(() => callback(res.data), 100)
        console.log('===> 商品 Searched (', res.data.goods.length, ') record');
      },
      error: (res) => {
        // 失败处理
        setTimeout(() => errback(res), 100)
        console.log('===> 商品 Searched ：失败!', res);
      }
    })
  }

}
