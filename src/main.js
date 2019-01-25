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
import axios from 'axios'
import global from './common/views/Global'
import store from './store'
import api from './common/js/baseApi'
import i18n from './i18n'


Vue.config.productionTip = false
Vue.use(ElementUI)
Vue.use(api)

// axios.defaults.headers['Content-Type'] = 'application/json;charset=UTF-8';  //此处是增加的代码，设置请求头的类型
axios.defaults.withCredentials=true;//让ajax携带cookie
axios.defaults.baseURL=global.baseurl
axios.interceptors.request.use(
  config => {
    let token = sessionStorage.getItem(global.TOKEN_KEY)
    if (token) {  // 判断是否存在token，如果存在的话，则每个http header都加上token
      config.headers.token = `${token}`
    }
    return config
  },
  err => {
    return Promise.reject(err)
  }
)
Vue.prototype.$http = axios
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
