<template>
  <div class="container" :style="{'background':themeColor}" :class="$store.state.constant.collapse?'menu-bar-collapse-width':'menu-bar-width'">
    <!-- 导航收缩 -->
    <span class="hamburger-container" :style="{'background':themeColor}">
      <Hamburger :onClick="onCollapse" :isActive="collapse"></Hamburger>
    </span>
    <!-- 导航菜单 -->
    <span class="nav-bar">
      <el-menu :default-active="activeIndex" class="el-menu-demo"
               :background-color="themeColor" text-color="#fff" active-text-color="#ffd04b" mode="horizontal" @select="selectNavBar()">
        <el-menu-item index="1" @click="$router.push('/Home')"><i class="fa fa-home fa-lg"></i>  </el-menu-item>
        <!--<el-menu-item index="2" @click="openWindow('https://gitee.com/liuge1988/kitty')">项目</el-menu-item>-->
        <!--<el-menu-item index="3" @click="openWindow('https://gitee.com/liuge1988/kitty/wikis/Home')">文档</el-menu-item>-->
        <!--<el-menu-item index="4" @click="openWindow('https://www.cnblogs.com/xifengxiaoma/')">博客</el-menu-item>-->
      </el-menu>
    </span>
    <span class="tool-bar">
      <!-- 用户信息 -->
      <el-dropdown class="user-info-dropdown" trigger="hover">
        <span class="el-dropdown-link"><img :src="this.userAvatar" /> {{userName}}</span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item divided @click.native="logout">退出</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </span>
  </div>
</template>

<script>
  import { mapState } from 'vuex'
  import Hamburger from '../hamburger/Hamburger';
  import loginJs from '../../api/Login'
  export default {
    name: "TopNavi",
    components: {Hamburger},
    data(){
      return {
        userName: "Louis",
        userAvatar: "",
        activeIndex: '1',
        backupVisible: false
      }
    },
    methods: {
      selectNavBar(key, keyPath) {
        console.log(key, keyPath)
      },
      handleSelect(key, keyPath) {
        console.log(key, keyPath);
      },
      openWindow(url) {
        window.open(url)
      },
      // 折叠导航栏
      onCollapse: function() {
        this.$store.commit('onCollapse')
      },
      jumpTo: function(url){
        this.$router.push(url); //用go刷新
      },
      // 退出登录
      logout: function() {
        this.$confirm("确认退出吗?", "提示", {
          type: "warning"
        })
          .then(() => {
            this.$http.post('/api/user/loginOut').then((resp) => {
              if (resp.status === 200 && resp.data.success === true) {
                this.$router.push("/")
              }
            })
          })
          .catch(() => {})
      }
    },
    mounted() {
      this.sysName = "玩玩而已"
      var user = 'dailiang'
      if (user) {
        this.userName = user
        this.userAvatar = require("@/assets/user.jpg")
      }
    },
    computed:{
      ...mapState({
        themeColor: state => state.constant.themeColor,
        collapse: state => state.constant.collapse
      })
    }
  }
</script>

<style scoped lang="scss">
  .container {
    position: absolute;
    left: 200px;
    right: 0px;
    height: 60px;
    line-height: 60px;
  }
  .hamburger-container {
    width: 40px;
    float: left;
    border-color: rgba(238, 241, 241, 0.4);
    border-left-width: 1px;
    border-left-style: solid;
    border-right-width: 1px;
    border-right-style: solid;
    color: white;
  }
  .nav-bar {
    margin-left: auto;
    float: left;
  }
  .el-menu {
    background: #0a463480;
  }
  .tool-bar {
    float: right;
  }
  .theme-picker {
    padding-right: 10px;
  }
  .lang-selector {
    padding-right: 10px;
    font-size: 15px;
    color: #fff;
    cursor: pointer;
  }
  .user-info-dropdown {
    font-size: 20px;
    padding-right: 20px;
    color: #fff;
    cursor: pointer;
  }
  img {
    width: 40px;
    height: 40px;
    border-radius: 10px;
    margin: 10px 0px 10px 10px;
    float: right;
  }
  .menu-bar-width {
    left: 200px;
  }
  .menu-bar-collapse-width {
    left: 65px;
  }
</style>
