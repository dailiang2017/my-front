<template>
  <div class="menu-bar-container">
    <!-- logo -->
    <div class="logo" :style="{'background-color':themeColor}" :class="collapse?'menu-bar-collapse-width':'menu-bar-width'"
         @click="$router.push('/')">
      <img v-if="collapse" src="@/assets/logo.png"/> <div>{{collapse?'':appName}}</div>
    </div>
    <!-- 导航菜单 -->
    <el-menu default-active="1" :class="collapse?'menu-bar-collapse-width':'menu-bar-width'"
             :collapse="collapse" @open="handleopen" @close="handleclose" @select="handleselect">
      <!-- 导航菜单树组件，动态加载菜单 -->
      <MenuTree v-for="item in navTree" :key="item.id" :menu="item"></MenuTree>
    </el-menu>
  </div>
</template>

<script>
  import { mapState } from 'vuex'
  import MenuTree from './MenuTree'
  import Menujs from '../../api/navi/Menu'
  export default {
    name: "LeftNavi",
    components: {
      MenuTree
    },
    methods: {
      handleopen() {
        console.log('handleopen')
      },
      handleclose() {
        console.log('handleclose')
      },
      handleselect(a, b) {
        console.log('handleselect')
      },
      findUserMenu() {
        Menujs.queryUserMenu().then((resp) => {
          if (resp.status === 200 && resp.data.success === true) {
            this.$store.commit('setNavTree', res.data.data)
          }
        })
      }
    },
    computed: {
      ...mapState({
        appName: state=>state.constant.appName,
        themeColor: state=>state.constant.themeColor,
        collapse: state=>state.constant.collapse,
        navTree: state=>state.menu.navTree
      })
    },
    mounted: function () {
      this.findUserMenu()
    }
  }
</script>

<style scoped>
</style>
