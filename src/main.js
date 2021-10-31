import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import VideoPlayer from 'vue-video-player'
import axios from './config/httpConfig'
import './assets/iconfont/iconfont.css'
import Avue from '@smallwei/avue'
import '@smallwei/avue/lib/index.css'
import './assets/index.css'

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
