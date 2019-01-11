import Vue from 'vue'
import Router from 'vue-router'
import Cookies from 'js-cookie'
import api from '@/common/js/api'
import store from '@/store/index'
import Login from '@/components/Login'
import Home from '@/components/navi/Home'
import Intro from '@/components/intro/Intro'

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
  // let aa = Cookies.get('token')
  addDynamicMenuAndRoutes(to, from)
})

/**
 * 动态加载菜单路由
 * @param to
 * @param from
 */
function addDynamicMenuAndRoutes(to, from) {
  api.menu.queryUserMenu().then((resp) => {
    if (resp.status === 200 && resp.data.success === true) {
      // 添加动态路由
      let routes = addDynamicRoutes(resp.data.data)
      router.options.routes[1].children = router.options.routes[1].children.concat(routes)
      router.addRoutes(router.options.routes)
      store.commit('setNavTree', resp.data.data)
      next({ ...to, replace: true })
    }
  })
}

function addDynamicRoutes (menuList = [], routes = []) {
  var temp = []
  for (var i = 0; i < menuList.length; i++) {
    if (menuList[i].children && menuList[i].children.length >= 1) {
      temp = temp.concat(menuList[i].children)
    } else if (menuList[i].url && /\S/.test(menuList[i].url)) {
      menuList[i].url = menuList[i].url.replace(/^\//, '')
      // 创建路由配置
      var route = {
        path: menuList[i].url,
        component: null,
        name: menuList[i].name
      }
      try {
        // 根据菜单URL动态加载vue组件，这里要求vue组件须按照url路径存储
        // 如url="sys/user"，则组件路径应是"@/views/sys/user.vue",否则组件加载不到
        let array = menuList[i].url.split('/')
        let url = array[0].substring(0,1)+array[0].substring(1) + '/' + array[1].substring(0,1).toUpperCase()+array[1].substring(1)
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
export default router
