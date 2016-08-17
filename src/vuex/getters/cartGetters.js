
/**
 * 获取购物车商品
 */
export const getGoods = state => {
  let goods = []
  state.cart.added.forEach( added => {
    let mirror = state.cart.goodsMirror.find(k => k.id === added.id)
    if (mirror) {
      goods.push({
        id: added.id,
        quantity: added.quantity,
        name: mirror.name,
        price: mirror.price,
      })
    }
  })
  console.log('===> 购物车 GetGoods (', goods.length , ') record')

  return goods
}
