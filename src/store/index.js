import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

import constant from './modules/constant'
import menu from './modules/menu'

export default new Vuex.Store({
  modules: {
    constant,
    menu
  }
})
