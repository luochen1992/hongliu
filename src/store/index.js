import Vue from 'vue'
import Vuex from 'vuex'
import tooBar from './modules/tooBar'
import bottomRightBar from './modules/bottomRightBar'
import functionMenu from './modules/functionMenu'
import layerlistData from './modules/layerlistData'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {},
    mutations: {},
    actions: {},
    modules: {
        tooBar,
        bottomRightBar,
        functionMenu,
        layerlistData
    }
})