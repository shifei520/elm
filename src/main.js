import Vue from 'vue'
import App from './App.vue'
import router from './router/index'

// 引入全局的css样式
import('assets/css/common.css')
// 引入iconfont图标样式
import('assets/font/iconfont.css')
// 引入1像素边框线css解决办法
import('assets/css/border.css')
Vue.config.productionTip = false
// 引入vant组件库
import './plugins/vant.js'
// 引入vuex
import store from './store/index'
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
