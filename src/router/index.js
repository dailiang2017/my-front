import Vue from 'vue'
import Router from 'vue-router'
import Cookies from 'js-cookie'
import api from '@/common/js/api'
import store from '@/store/index'
import Login from '@/components/Login'
import Home from '@/components/Home'
import Intro from '@/components/intro/Intro'
import constant from '../store/modules/constant'
import global from '../common/views/Global'

Vue.use(Router)

const router = new Router({
  routes: [
    {
      path: '/',
      name: '登录',
      component: Login
    },
    {
      path: '/Home',
      name: '首页',
      component: Home,
      children: [
        {
          path: '',
          name: '系统介绍',
          component: Intro
        }
      ]
    }
  ]
})

router.beforeEach((to, from, next) => {
  let token = sessionStorage.getItem(global.TOKEN_KEY)
  if (to.path == '/') {
    if (token) {
      // 如果访问登录页面，此时会话信息存在，则直接跳转到首页
      next({ path: '/Home' })
    } else {
      next()
    }
  } else {
    if (!token) {
      // 会话信息不存在，则说明登陆过期，跳转到登录页面
      next({ path: '/' })
    } else {
      addDynamicMenuAndRoutes(to, from)
      next()
    }
  }
})

/**
 * 动态加载菜单路由
 * @param to
 * @param from
 */
function addDynamicMenuAndRoutes(to, from) {
  if(store.state.constant.menuRouteLoaded) {
    console.log('动态菜单和路由已经存在.')
    return
  }
  api.menu.queryUserMenu().then((resp) => {
    if (resp.status === 200 && resp.data.success === true) {
      // 添加动态路由
      let routes = addDynamicRoutes(resp.data.data)
      router.options.routes[1].children = router.options.routes[1].children.concat(routes)
      // router.options.routes[1].children = router.options.routes[1].children.concat(menuData)
      console.log(router.options.routes);
      router.addRoutes(router.options.routes)
      store.commit('setMenuRouteLoaded', true)
      store.commit('setNavTree', resp.data.data)
    }
  })
}

function addDynamicRoutes (menuList = [], routes = []) {
  var temp = []
  for (var i = 0; i < menuList.length; i++) {
    if (menuList[i].children && menuList[i].children.length >= 1) {
      temp = temp.concat(menuList[i].children)
    } else if (menuList[i].url && /\S/.test(menuList[i].url)) {
      // menuList[i].url = menuList[i].url.replace(/^\//, '')
      // 创建路由配置
      var route = {
        path: menuList[i].url,
        component: null,
        name: menuList[i].name,
        meta: {
          icon: menuList[i].icon
        }
      }
      try {
        // 根据菜单URL动态加载vue组件，这里要求vue组件须按照url路径存储
        // 如url="sys/user"，则组件路径应是"@/views/sys/user.vue",否则组件加载不到
        let array = menuList[i].url.split('/')
        let url = array[1].substring(0,1)+array[1].substring(1) + '/' + array[2].substring(0,1).toUpperCase()+array[2].substring(1)
        route['component'] = resolve => require([`@/components/${url}`], resolve)
      } catch (e) {}
      routes.push(route)
    }
  }
  if (temp.length >= 1) {
    addDynamicRoutes(temp, routes)
  } else {
    console.log('动态路由加载...')
    console.log(routes)
    console.log('动态路由加载完成.')
  }
  return routes
}

const menuData = [
  {id:1,path:'/sys/user',component: require('@/components/sys/User.vue'),name:'用户',icon:'el-icon-service'}
]
export default router
