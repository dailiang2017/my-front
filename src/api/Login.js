import api from '../http/api'
export default {
  findAll () {
    return axios({
      url: '/api/user/findAll',
      method: 'get'
    });
  },
  login : function (data) {
    return api({
      url: '/api/user/login',
      method: 'post',
      data
    })
  }
}
