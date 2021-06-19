<template>
  <el-dialog title="编辑用户" :visible.sync="addDialogVisible" width="46%" @close="handleCloseDialog">
      <!-- 内容主体 -->
      <el-form
        :model="editUserForm"
        ref="editUserFormRef"
        size="medium"
        :inline="false"
        :rules="editUserFormRules"
        label-width="100px"
      >
        <el-form-item label="用户名" prop="username">
          <el-input v-model="editUserForm.username" disabled></el-input>
        </el-form-item>
        <el-form-item label="邮箱" prop="email">
          <el-input v-model="editUserForm.email"></el-input>
        </el-form-item>
        <el-form-item label="手机" prop="mobile">
          <el-input v-model="editUserForm.mobile"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="handleCloseDialog">取 消</el-button>
        <el-button type="primary" @click="handleEdit">确 定</el-button>
      </span>
    </el-dialog>
</template>

<script>
import { editUser } from '@/api/user'
export default {
  name: '',
  props: {
    showEditDialog: Boolean,
    userInfo: Object
  },
  data () {
    return {
      addDialogVisible: false,
      editUserForm: {},
      editUserFormRules: {
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
    handleCloseDialog() {
      this.addDialogVisible = false
      this.$emit('close', this.addDialogVisible)
    },
    handleEdit() {
      this.$refs.editUserFormRef.validate(async valid => {
        if (valid) {
          const res = await editUser(this.editUserForm)
          if (res.meta.status === 200) {
            this.$notify({
              title: '成功',
              message: res.meta.msg,
              type: 'success'
            })
            this.addDialogVisible = false
            this.$emit('editSuccess')
          } else {
            this.$notify.error(res.meta.msg)
            this.handleCloseDialog()
          }
        }
      })
    }
  },

  watch: {
    userInfo(obj) {
      this.editUserForm = {
        username: obj.username,
        id: obj.id,
        email: obj.email,
        mobile: obj.mobile
      }
      this.addDialogVisible = true
    }
  }

}

</script>
<style lang='scss' scoped>

</style>
