const app = {
  state: {
    // 页面输入状态, 主要针对移动端输入时虚拟键盘弹出，在App组件内修改
    inputing: false,
    // 是否横屏
    isLandscape: false,
  },

  mutations: {
    SET_INPUTING (state, status) {
      state.inputing = !!status
    },
    SET_LANDSCAPE (state, status) {
      state.isLandscape = !!status
    },
  }
}

export default app
