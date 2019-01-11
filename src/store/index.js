import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

import constant from './modules/constant'
import menuConstant from './modules/menuConstant'

export default new Vuex.Store({
  modules: {
    constant,
    menuConstant
  }
})
