const functionMenu = {
  state: {
    nowMenuName: null,
    oneMenuName: null
  },
  mutations: {
    setNowMenuName(state, va) {
      state.nowMenuName = va
    },
    setOneMenuName(state, va) {
      state.oneMenuName = va
    }
  },
  getters: {
    getNowMenuName(state, getters, rootState) {
      return state.nowMenuName
    },
    getOneMenuName(state, getters, rootState) {
      return state.oneMenuName
    }
  }
}
export default functionMenu
