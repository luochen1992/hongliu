const bottomRightBar = {
    state: {
        nowbrtoolbar: null
    },
    mutations: {
        setBRToolBar(state, va) {
            state.nowbrtoolbar = va
        }
    },
    getters: {
        getBRToolBar(state, getters, rootState) {
            return state.nowbrtoolbar
        }
    }
}
export default bottomRightBar