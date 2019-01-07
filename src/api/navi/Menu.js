import axios from 'axios'

export default {
  queryUserMenu() {
    return axios({
      url: '/api/user/queryUserMenu',
      method: 'get'
    })
  }
}
