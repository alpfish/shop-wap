// getters.js
// 获取状态处理相对简单，都存于一个文件中，也方便组件间共享
import store from './store'

// 用户认证
export function auth() {
  return store.state.member.auth ? store.state.member.info : false
}
// 简洁写法，不易理解
// export const auth = () => store.state.member.auth ? store.state.member.info : false

// 购物车
export const cartLoaded = () => store.state.cart.loaded
export const cartAdded = () => store.state.cart.added
