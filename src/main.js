import Avue from '@smallwei/avue'
import '@smallwei/avue/lib/index.css'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import Vue from 'vue'
import VideoPlayer from 'vue-video-player'
import App from './App.vue'
import './assets/iconfont/iconfont.css'
import './assets/index.css'
import axios from './config/httpConfig'
import router from './router'
import store from './store'

Vue.config.productionTip = false
Vue.prototype.$http = axios

Vue.use(ElementUI)
Vue.use(Avue)
Vue.use(VideoPlayer)
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
