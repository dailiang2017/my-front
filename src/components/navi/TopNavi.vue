<template>
  <div class="container">
    <!-- 导航收缩 -->
    <span class="hamburger-container" :style="{'background':themeColor}">
      <hamburger :onClick="onCollapse" :isActive="collapse"></hamburger>
    </span>
    <!-- 导航菜单 -->
    <span class="nav-bar">
      <el-menu :default-active="defaultActiveIndex" :router="true">
        <el-menu-item >工作台</el-menu-item>
        <el-menu-item >企业管理</el-menu-item>
        <el-menu-item >订单管理</el-menu-item>
        <el-menu-item >系统管理</el-menu-item>
      </el-menu>
    </span>
    <span class="tool-bar">
      <!-- 用户信息 -->
      <el-dropdown class="user-info-dropdown" trigger="hover" @command="handleCommand">
        <span class="el-dropdown-link"><img :src="this.userAvatar" /> {{userName}}</span>
        <el-dropdown-menu slot="dropdown">
            <el-dropdown-item>
              <div @click="jumpTo('/user/profile')"><span style="color: #555;font-size: 14px;">个人信息</span></div>
            </el-dropdown-item>
            <el-dropdown-item>
              <div @click="jumpTo('/user/changepwd')"><span style="color: #555;font-size: 14px;">修改密码</span></div>
            </el-dropdown-item>
            <el-dropdown-item divided @click.native="logout">退出登录</el-dropdown-item>
          </el-dropdown-menu>
      </el-dropdown>
    </span>
  </div>
</template>

<script>
  import Hamburger from "../hamburger/Hamburger";
  export default {
    name: "TopNavi",
    components: {Hamburger},
    data(){
      return {
        loading: false,
        companyName: '',
        nickname: '',
        defaultActiveIndex: '/',
        homeMenu: false,
        messageCount: 5
      }
    },
    methods: {
      // 折叠导航栏
      onCollapse: function() {
        // this.$store.commit('onCollapse')
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
            // sessionStorage.removeItem("user")
            this.$router.push("/")
            // this.$api.login.logout().then((res) => {
            // }).catch(function(res) {
            // })
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
    }
  }
</script>

<style scoped>
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
