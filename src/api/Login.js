import axios from '../common/js/axios'
export default {
  findAll () {
    return axios({
      url: '/api/user/findAll',
      method: 'get'
    });
  }
}
