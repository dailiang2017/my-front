import axios from 'axios'
export default {
  findAll () {
    return axios({
      url: '/api/user/findAll',
      method: 'get'
    });
  }
}
