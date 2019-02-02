// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import 'font-awesome/css/font-awesome.min.css'
import '@/assets/iconfont/iconfont.css'
import '../static/css/main.css'
import global from './common/views/Global'
import store from './store'
import api from './http'
import i18n from './i18n'

Vue.config.productionTip = false
Vue.use(ElementUI)
Vue.use(api)

// axios.defaults.baseURL=global.baseurl
Vue.prototype.$global = global

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  i18n,
  components: { App },
  template: '<App/>'
})
