<template>
  <div class="login-wrapper">
    <div class="login-box">
      <div class="img-box">
        <img src="@/assets/logo.png"
             alt="">
      </div>
      <div class="form-box">
        <el-form :model="loginForm"
                 ref="loginForm"
                 :rules="loginFormRules"
                 label-width="80px"
                 :inline="false"
                 size="medium">
          <el-form-item label="账号"
                        prop="username">
            <el-input clearable
                      prefix-icon="el-icon-user"
                      v-model="loginForm.username"></el-input>
          </el-form-item>
          <el-form-item label="密码"
                        prop="password">
            <el-input clearable
                      show-password
                      prefix-icon="el-icon-lock"
                      v-model="loginForm.password"></el-input>
          </el-form-item>
          <el-form-item class="btns">
            <el-button type="primary"
                       @click="onSubmit">登录</el-button>
            <el-button @click="resetForm">重置</el-button>
          </el-form-item>
        </el-form>

      </div>
    </div>
  </div>
</template>

<script>
import { userLogin } from '@/api/user'
export default {
  name: '',
  props: {},
  data () {
    return {
      loginForm: {
        username: 'admin',
        password: '123456'
      },
      loginFormRules: {
        username: [
          {
            required: true,
            message: '请输入用户名',
            trigger: 'blur'
          },
          {
            min: 3,
            max: 10,
            message: '请输入长度为3到10的用户名',
            trigger: 'blur'
          }
        ],
        password: [
          {
            required: true,
            message: '请输入密码',
            trigger: 'blur'
          },
          {
            min: 6,
            message: '密码长度不得小于6',
            trigger: 'blur'
          }
        ]

      }
    }
  },

  components: {},
  created() {},

  computed: {},

  beforeMount() {},

  mounted() {},

  methods: {
    onSubmit() {
      this.$refs.loginForm.validate(async (valid) => {
        if (valid) {
          const res = await userLogin(this.loginForm)
          if (res.meta.status === 200) {
            this.$notify({
              title: '登录成功',
              message: `欢迎回来，用户 ${res.data.username}`,
              type: 'success'
            })
            localStorage.setItem('userInfo', JSON.stringify(res.data))
            localStorage.setItem('token', res.data.token)
            this.$router.push('/')
          } else {
            this.$message.error(res.meta.msg)
          }
        }
      })
    },
    resetForm() {
      this.$refs.loginForm.resetFields()
    }
  },

  watch: {}
}
</script>
<style lang='scss' scoped>
.login-wrapper {
  width: 100%;
  height: 100%;
  background: #2B4B6B;
  .login-box {
    width: 450px;
    height: 360px;
    background: #ffffff;
    border-radius: 3px;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%,-50%);
    .img-box {
      width: 130px;
      height: 130px;
      border: 1px solid #eee;
      border-radius: 50%;
      padding: 10px;
      box-shadow: 0 0 10px #ddd;
      position: absolute;
      left: 50%;
      transform: translate(-50%,-50%);
      background: #ffffff;
      img {
        width: 100%;
        height: 100%;
        border-radius: 50%;
        background: #eee
      }
    }
    .form-box {
      position: absolute;
      width: 100%;
      box-sizing: border-box;
      bottom: 60px;
      padding: 0 20px 0 10px;
      .btns {
        display: flex;
        justify-content: center;
      }
    }
  }
}
</style>
