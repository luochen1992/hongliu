const layerlistData = {
  state: {
    layerlistData: null
  },
  mutations: {
    setLayerListData(state, va) {
      state.layerlistData = va
    }
  },
  getters: {
    getLayerListData(state, getters, rootState) {
      return state.layerlistData
    }
  }
}
export default layerlistData
