<template>
  <el-dialog
    title="添加用户"
    :visible.sync="addDialogVisible"
    width="46%"
    @close="addDialogClosed"
  >
    <!-- 内容主体 -->
    <el-form
      :model="addUserForm"
      ref="addUserFormRef"
      size="medium"
      :inline="false"
      :rules="addUserFormRules"
      label-width="100px"
    >
      <el-form-item label="用户名" prop="username">
        <el-input v-model="addUserForm.username"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input v-model="addUserForm.password" show-password></el-input>
      </el-form-item>
      <el-form-item label="邮箱" prop="email">
        <el-input v-model="addUserForm.email"></el-input>
      </el-form-item>
      <el-form-item label="手机" prop="mobile">
        <el-input v-model="addUserForm.mobile"></el-input>
      </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button @click="handleClose">取 消</el-button>
      <el-button type="primary" @click="addUser">确 定</el-button>
    </span>
  </el-dialog>
</template>

<script>
import { addUser } from '@/api/user'
export default {
  name: '',
  props: {
    showDialog: Boolean
  },
  data() {
    return {
      addDialogVisible: false,
      addUserForm: {
        username: '',
        password: '',
        email: '',
        mobile: ''
      },
      addUserFormRules: {
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
        ],
        email: [
          {
            required: true,
            message: '请输入邮箱',
            trigger: 'blur'
          },
          {
            type: 'email',
            message: '邮箱格式不正确',
            trigger: 'blur'
          }
        ],
        mobile: [
          {
            required: true,
            message: '电话号码为必填参数',
            trigger: 'blur'
          },
          {
            pattern: /^(?:(?:\+|00)86)?1(?:(?:3[\d])|(?:4[5-7|9])|(?:5[0-3|5-9])|(?:6[5-7])|(?:7[0-8])|(?:8[\d])|(?:9[1|8|9]))\d{8}$/,
            message: '电话号码不合法',
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
    addDialogClosed() {
      this.$refs.addUserFormRef.resetFields()
      this.addDialogVisible = false
      this.$emit('close', this.addDialogVisible)
    },
    handleClose() {
      this.addDialogVisible = false
      this.$emit('close', this.addDialogVisible)
    },
    async addUser() {
      this.$refs.addUserFormRef.validate(async (valid) => {
        if (valid) {
          const res = await addUser(this.addUserForm)
          if (res.meta.status === 201) {
            this.$notify({
              title: '成功',
              message: '添加用户成功',
              type: 'success'
            })
            this.$emit('addUser', res.meta.status)
          } else {
            this.$notify.error('操作失败')
            this.addDialogVisible = false
            this.$emit('close', this.addDialogVisible)
          }
        }
      })
    }
  },

  watch: {
    showDialog(value, oldValue) {
      this.addDialogVisible = value
    }
  }
}
</script>
<style lang='scss' scoped>
</style>
