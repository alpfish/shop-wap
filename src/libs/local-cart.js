import Cache from 'libs/cache'
import {
  CART_KEY,
} from 'src/config'

class LocalCart {

  get() {
    let data = Cache.get(CART_KEY)
    return data ? JSON.parse(data) : []
  }

  add(buys) {
    if (_.isEmpty(buys) || !_.isArray(buys)) return
    let cart = this.get()
    for (let i in buys) {
      let buy = {
        sku_id: buys[i].sku_id,
        buy_nums: buys[i].buy_nums,
      }
      if (_.some(cart, buy)) {
        // 更新 TODO
        let index = _.findIndex(cart, (item) => item.sku_id == buy.sku_id)
        cart.$set(index, buy)
      } else {
        cart.push(buy)
      }
    }
    this._set(cart)
    console.log('LocalCart Added');
  }

  update(sku_id, newData) {
    let data = {
      sku_id: newData.sku_id,
      buy_nums: newData.buy_nums,
    }
    let cart = this.get()
    let index = _.findIndex(cart, (item) => item.sku_id == sku_id)
    cart[index] = data
    this._set(cart)
  }

  delete(sku_ids) {
    sku_ids = _.isArray(sku_ids) ? sku_ids : [sku_ids]
    let cart = this.get()
    for (let i in sku_ids) {
      let index = _.findIndex(cart, (item) => item.sku_id == sku_ids[i] )
      cart.$remove(cart[index])
    }
    this._set(cart)
  }

  clear() {
    Cache.delete(CART_KEY)
  }

  _set(items) {
    let data = Array.isArray(items) ? JSON.stringify(items) : items
    Cache.set(CART_KEY, data)
  }

}

export default new LocalCart()
