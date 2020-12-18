import Vue from 'vue'
import App from './App'

Vue.config.productionTip = false
App.mpType = 'app'

wx.cloud.init({
  env: 'w804340821-5gl2pxi7ea138ab1'
})


const app = new Vue(App)
app.$mount()
