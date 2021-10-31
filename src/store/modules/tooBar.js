const tooBar = {
  state: {
    nowtoolbar: null
  },
  mutations: {
    setToolBar(state, va) {
      state.nowtoolbar = va
    }
  },
  getters: {
    getToolBar(state, getters, rootState) {
      return state.nowtoolbar
    }
  }
}
export default tooBar
