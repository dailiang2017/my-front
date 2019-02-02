import axios from 'axios'
import global from "../common/views/Global"
import key from "../common/views/StorageKey"
import router from '@/router'

export default function $axios (options) {
  return new Promise((resolve, reject) => {

    const instance = axios.create({
        baseURL: global.baseurl,
        headers: {
          'Content-Type': 'application/json;charset=UTF-8'
        },
        timeout: 10000
      }
    )

    // 请求拦截
    instance.interceptors.request.use(
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
    // 响应拦截
    instance.interceptors.response.use(
      data => {
        return data
      },err => {
        if (err && err.response) {
          switch (err.response.status) {
            case 400:
              err.message = err.response.data
              break
            case 401:
              // 该用户没有该权限
              window.localStorage.setItem(key.error_key,err.response.data)
              router.push('/error')
              break
            case 600:
              // 该账户已在其它设备登录，请先退出。如果此登录非您本人操作，请联系客服申诉。
              window.localStorage.setItem(key.error_key,err.response.data)
              router.push('/error')
              break
            case 601:
              // 登录过期，请重新登录
              sessionStorage.removeItem(global.TOKEN_KEY)
              router.push('/')
              break
            default:
          }
        }
        return Promise.reject(err)
      }
    )
    //请求处理
    instance(options).then((res) => {
      resolve(res)
      return false
    })
    .catch((error) => {
      reject(error)
    })

  })

}
