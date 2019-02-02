import api from '../../http/api'

export default {
  loginOut : function (data) {
    return api({
      url: '/api/user/loginOut',
      method: 'get'
    })
  },
  queryUserPage : function (data) {
    return api({
      url: '/api/user/queryUserPage',
      method: 'post',
      data
    })
  },
  delete : function (id) {
    return api({
      url: '/api/user/delete/' + id,
      method: 'get'
    })
  },
  insertOrUpdate : function (data) {
    // 新增
    let url = '/api/user/insert'
    let id = data.id
    if (id) {
      // 编辑
      url = '/api/user/update'
    }
    return api({
      url: url,
      method: 'post',
      data
    })
  },
}
