import {
  ADD_TO_CART,
  UPDATE_CART_MIRROR}
  from 'src/vuex/mutationTypes'

const state = {

  // [已添加商品]
  // 包含：{ id, quantity }
  // 通过 getters.js 从 goodsMirror 中获取商品详情
  added: [
    {id:2, quantity:6},
    {id:1, quantity:1},
    {id:3, quantity:2},
    {id:4, quantity:8},
    {id:14, quantity:8},
    {id:24, quantity:8},
    {id:34, quantity:8},
  ],

  // [商品镜像]
  // ADD_TO_CART 时自动添加；
  // 获取时（判断/定时）从服务器更新；
  goodsMirror:[],

}

const mutations = {

  // 添加，减少或删除 added 中的商品
  ADD_TO_CART (state, iterm, quantity) {
    quantity = Number(quantity) || 1
    const record = state.added.find(k => k.id === iterm.id)
    if (!record) {
      state.added.push({
       id: iterm.id,
       quantity: quantity
      })
      if (!state.goodsMirror.find(k => k.id === iterm.id)) {
        state.goodsMirror.push(Object(iterm))
      }
    }
    else if (record.quantity + quantity > 0){
      record.quantity += quantity
    }
    else {
      state.added.$remove(record)
    }
  },

  UPDATE_CART_MIRROR (state, goods) {
    state.goodsMirror = goods
  }

}

export default {
  state,
  mutations
}
