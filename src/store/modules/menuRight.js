const menuRight = {
    state: {
        nowMenuName: null
    },
    mutations: {
        setNowMenuName(state, va) {
            state.nowMenuName = va
        }
    },
    getters: {
        getNowMenuName(state, getters, rootState) {
            return state.nowMenuName
        }
    }
}
export default menuRight