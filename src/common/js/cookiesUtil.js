import Cookies from 'js-cookie'
const TOKEN = 'token'
export default {
  set (name, value) {
    Cookies.set(name, value)
  },
  get (name) {
    return Cookies.get(name)
  },
  remove (name) {
    Cookies.remove(name)
  },
  clear () {
    Cookies.clear()
  },
  getToken () {
    return Cookies.get(TOKEN)
  }
}
