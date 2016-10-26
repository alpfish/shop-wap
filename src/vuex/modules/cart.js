import {
  ADD_TO_CART,
  UPDATE_TO_CART,
  DELETE_FROM_CART,
  SET_CART_LOADED,
  CLEAR_CART,
}
from 'src/vuex/mutation-types'

const state = {
  // 购物车商品, 类似二维数组的对象，对sku_id为键名
  added: [],
  // 购物车状态
  loaded: false,
  adding: false,
  updating: false,
  deleting: false,
}

const mutations = {
  // 按二维数组添加商品
  [ADD_TO_CART] (state, buys) {
    console.log('ADD_TO_CART');
    if (_.isEmpty(buys) || !_.isArray(buys)) return
    if (_.isEmpty(state.added)){
      state.added = buys
      return
    }

    for (let i in buys) {
      let buy = buys[i]
      if (_.some(state.added, buy)) {
        // 更新
        state.added.$set(_.findIndex(state.added, (v) => v.sku_id == buy.sku_id), buy)
      } else {
        state.added.push(buy)
      }
    }
  },

  [UPDATE_TO_CART] (state, sku_id, newData) {
    // newData参数里包含新的数据及新的sku_id, 使用 $set 同步数据
    if (!_.isEmpty(newData)) {
      state.added.$set(_.findIndex(state.added, (v) => v.sku_id == sku_id), newData)
      console.log('UPDATE_TO_CART', sku_id);
    }
  },

  [DELETE_FROM_CART] (state, sku_ids) {
    for (let i in sku_ids) {
      let index = _.findIndex(state.added, (item) => item.sku_id == sku_ids[i] )
      state.added.$remove(state.added[index])
      console.log('DELETE_FROM_CART', sku_ids[i]);
    }
  },

  [CLEAR_CART] (state) {
    state.added = []
  },

  [SET_CART_LOADED] (state, status) {
    state.loaded = !!status
  },

  SET_CART_ADDING(state, status) {
    state.adding = !!status
  },

  SET_CART_UPDATING(state, status) {
    state.updating = !!status
  },

  SET_CART_DELETING(state, status) {
    state.deleting = !!status
  },

}

export default {
  state,
  mutations
}
