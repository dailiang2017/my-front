// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import 'font-awesome/css/font-awesome.min.css'
import '@/assets/iconfont/iconfont.css'
import axios from 'axios'
import global from './common/views/Global'
import store from './store'
import api from './common/js/baseApi'

// axios.defaults.headers['Content-Type'] = 'application/json;charset=UTF-8';  //此处是增加的代码，设置请求头的类型
axios.defaults.withCredentials=true;//让ajax携带cookie
axios.defaults.baseURL=global.baseurl
Vue.config.productionTip = false
Vue.use(ElementUI)
Vue.use(api)
Vue.prototype.$http = axios
Vue.prototype.$global = global

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
