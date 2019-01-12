<template>
  <div class="menu-bar-container">
    <!-- logo -->
    <div class="logo" :style="{'background-color':themeColor}" :class="collapse?'menu-bar-collapse-width':'menu-bar-width'"
         @click="$router.push('/Home')">
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
      }
    },
    computed: {
      ...mapState({
        appName: state=>state.constant.appName,
        themeColor: state=>state.constant.themeColor,
        collapse: state=>state.constant.collapse,
        navTree: state=>state.menuConstant.navTree
      })
    }
  }
</script>

<style scoped>
  .menu-bar-container {
  }
  .logo {
    position:absolute;
    top: 0px;
    height: 60px;
    line-height: 60px;
    background: #545c64;
    cursor:pointer;
  }
  .el-menu {
    position:absolute;
    top: 60px;
    bottom: 0px;
    text-align: left;
  }
  img {
    width: 40px;
    height: 40px;
    border-radius: 0px;
    margin: 10px 10px 10px 10px;
    float: left;
  }
  div {
    font-size: 25px;
    color: white;
    text-align: left;
    /*padding-left: 20px;*/
  }
  .menu-bar-width {
    width: 200px;
  }
  .menu-bar-collapse-width {
    width: 65px;
  }
</style>
