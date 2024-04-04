import App from './App'

// #ifndef VUE3
import Vue from 'vue'
import './uni.promisify.adaptor'
Vue.config.productionTip = false
App.mpType = 'app'
// main.js
import uView from '@/uni_modules/uview-ui'
Vue.use(uView)

import api from 'common/api.js'
Vue.prototype.$request = api
Vue.prototype.$url = 'http://124.93.196.45:10001/'
const app = new Vue({
  ...App
})
app.$mount()
// #endif

// #ifdef VUE3
import { createSSRApp } from 'vue'
export function createApp() {
  const app = createSSRApp(App)
  return {
    app
  }
}
// #endif