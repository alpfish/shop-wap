import {
  UPDATE_LOADING,
  UPDATE_DIRECTION,
  UPDATE_INPUTING,
  UPDATE_LANDSCAPE,
} from 'src/vuex/mutation-types'

const state = {
  // 页面加载状态
  loading: false,
  // 页面浏览方向(前进/后退)
  direction: 'forward',
  // 页面输入状态, 主要针对移动端输入时虚拟键盘弹出，在App组件内修改
  inputing: false,
  // 是否横屏
  isLandscape: false,
}

const mutations = {
  [UPDATE_LOADING](state, status) {
    state.loading = !!status
  },
  [UPDATE_DIRECTION] (state, direction) {
    state.direction = direction
  },
  [UPDATE_INPUTING] (state, status) {
    state.inputing = !!status
  },
  [UPDATE_LANDSCAPE] (state, status) {
    state.isLandscape = !!status
  },
}

export default {
  state,
  mutations
}
