<template>
  <el-form :model="loginForm" ref="loginForm" :rules="fieldRules" label-position="left" label-width="0px" class="demo-ruleForm login-container">
    <h2 class="title" style="padding-left: 22px;">系统登录</h2>
    <el-form-item prop="username">
      <el-input type="text" v-model="loginForm.username" placeholder="账号"></el-input>
    </el-form-item>
    <el-form-item prop="password">
      <el-input type="text" v-model="loginForm.password" placeholder="密码"></el-input>
    </el-form-item>
    <el-form-item style="width:100%;">
      <el-button type="primary" style="width:48%;" @click.native.prevent="reset('loginForm')">重 置</el-button>
      <el-button type="primary" style="width:48%;" @click.native.prevent="login('loginForm')" :loading="loading">登 录</el-button>
    </el-form-item>
  </el-form>
</template>
<script>
export default {
  data () {
    return {
      loading: false,
      loginForm: {
        username: 'dailiang',
        password: '123456'
      },
      fieldRules: {
        username: [
          { required: true, message: '请输入账号', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' }
        ]
      },
      check: true
    }
  },
  methods: {
    login (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.loading = true
          let userInfo = {username: this.loginForm.username, password: this.loginForm.password}
          this.$http.post('/api/user/login', userInfo).then((resp) => {
            if (resp.status === 200 && resp.data.success === true) {
              // this.$message.info('登录成功！')
              this.$router.push('/Home')
            }
          })
        } else {
          return false
        }
      })
    },
    reset (formName) {
      this.$refs[formName].resetFields()
    }
  }
}
</script>
<style scoped>
  .login-container {
    -webkit-border-radius: 5px;
    border-radius: 5px;
    -moz-border-radius: 5px;
    background-clip: padding-box;
    margin: 100px auto;
    width: 350px;
    padding: 35px 35px 15px 35px;
    background: #fff;
    border: 1px solid #eaeaea;
    box-shadow: 0 0 25px #cac6c6;
  }
  .title {
    margin: 0px auto 40px auto;
    text-align: center;
    color: #505458;
  }
</style>
