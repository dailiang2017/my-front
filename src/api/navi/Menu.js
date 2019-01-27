import axios from 'axios'

export default {
  queryUserMenu() {
    return axios({
      url: '/api/user/queryUserMenu',
      method: 'get'
    })
  },
  queryMenuTree() {
    return axios({
      url: '/api/user/queryMenuTree',
      method: 'get'
    })
  },
  deleteMenu(id) {
    return axios({
      url: '/api/user/deleteMenu/' + id,
      method: 'get'
    })
  },
  addMenu(data) {
    return axios({
      url: '/api/user/addMenu',
      method: 'post',
      data: data
    })
  }
}
