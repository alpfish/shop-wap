// getters.js
// 获取状态处理相对简单，都存于一个文件中，也方便组件间共享
import store from './store'

export const auth = store => store.state.member.auth
