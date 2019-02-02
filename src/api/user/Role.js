import api from '../../http/api'

export default {
  insertOrUpdate : function (data) {
    // 新增
    let url = '/api/user/role/insert'
    let id = data.id
    if (id) {
      // 编辑
      url = '/api/user/role/update'
    }
    return api({
      url: url,
      method: 'post',
      data
    })
  },
  delete : function (id) {
    return api({
      url: '/api/user/role/delete/' + id,
      method: 'get'
    })
  },
  queryPage : function (data) {
    return api({
      url: '/api/user/role/queryPage',
      method: 'post',
      data
    })
  }
}
