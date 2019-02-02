import api from '../../http/api'

export default {
  queryUserMenu() {
    return api({
      url: '/api/user/queryUserMenu',
      method: 'get'
    })
  },
  queryMenuTree() {
    return api({
      url: '/api/user/queryMenuTree',
      method: 'get'
    })
  },
  deleteMenu(id) {
    return api({
      url: '/api/user/deleteMenu/' + id,
      method: 'get'
    })
  },
  addMenu(data) {
    return api({
      url: '/api/user/addMenu',
      method: 'post',
      data: data
    })
  }
}
