<template>
  <div class="site-wrapper site-page--not-found">
    <div class="site-content__wrapper">
      <div class="site-content">
        <!--<h2 class="not-found-title">{{code}}</h2>-->
        <p class="not-found-desc">{{msg}}</p>
        <el-button @click="$router.go(-1)">返回上一页</el-button>
        <el-button type="primary" class="not-found-btn-gohome" @click="to_login">进入登录页</el-button>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    data () {
      return {
        msg: ''
      }
    },
    created() {
      this.getRouterData()
    },
    methods: {
      getRouterData() {
        this.msg = window.localStorage.getItem(this.$key.error_key)
        console.log('msg', this.msg)
      },
      to_login() {
        this.$router.push('/')
      }

    }
  }
</script>

<style lang="scss">
  .site-wrapper.site-page--not-found {
    position: absolute;
    top: 60px;
    right: 0;
    bottom: 0;
    left: 0;
    overflow: hidden;
  }
  .site-content__wrapper {
    padding: 0;
    margin: 0;
    background-color: #fff;
  }
  .site-content {
    position: fixed;
    top: 15%;
    left: 50%;
    z-index: 2;
    padding: 30px;
    text-align: center;
    transform: translate(-50%, 0);
  }
  .not-found-title {
    margin: 20px 0 15px;
    font-size: 8em;
    font-weight: 500;
    color: rgb(55, 71, 79);
  }
  .not-found-desc {
    margin: 0 0 30px;
    font-size: 26px;
    text-transform: uppercase;
    color: rgb(118, 131, 143);
  }
  .not-found-btn-gohome {
    margin-left: 30px;
  }
  > em {
    font-style: normal;
    color: #ee8145;
  }
</style>
