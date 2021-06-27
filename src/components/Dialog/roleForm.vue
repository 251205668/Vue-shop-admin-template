<template>
  <el-dialog
    title="添加角色"
    :visible.sync="addDialogVisible"
    width="40%"
    @close="addDialogClosed"
  >
    <!-- 内容主体 -->
    <el-form
      :model="addRoleForm"
      ref="addFormRef"
      size="medium"
      :inline="false"
      :rules="addRoleRules"
      label-width="100px"
    >
      <el-form-item label="角色名称" prop="roleName">
        <el-input v-model="addRoleForm.roleName"></el-input>
      </el-form-item>
      <el-form-item label="角色描述" prop="roleDesc">
        <el-input v-model="addRoleForm.roleDesc"></el-input>
      </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button  @click="handleClose">取 消</el-button>
      <el-button type="primary" @click="handleSubmit">确 定</el-button>
    </span>
  </el-dialog>
</template>

<script>
import { addRole, editRole } from '@/api/role'
export default {
  props: {
    roleForm: Object,
    showRoleForm: Boolean
  },
  data() {
    return {
      addDialogVisible: false,
      addRoleForm: {
        roleName: '',
        roleDesc: ''
      },
      addRoleRules: {
        roleName: [
          {
            required: true,
            message: '请输入角色名称',
            trigger: 'blur'
          },
          {
            min: 3,
            max: 10,
            message: '请输入长度为3到10的角色名',
            trigger: 'blur'
          }
        ],
        roleDesc: [
          {
            required: true,
            message: '请输入角色秒描述',
            trigger: 'blur'
          },
          {
            min: 1,
            max: 200,
            message: '请输入长度为1到200字的角色描述',
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
      this.$refs.addFormRef.resetFields()
      this.addDialogVisible = false
      this.$emit('close', this.addDialogVisible)
    },
    handleClose() {
      this.addDialogVisible = false
      this.$emit('close', this.addDialogVisible)
    },
    async handleSubmit() {
      this.$refs.addFormRef.validate(async (valid) => {
        if (valid) {
          // form有值编辑，无值添加
          if (this.addRoleForm.type === 'edit') {
            const res = await editRole(this.addRoleForm)
            if (res.meta.status === 200) {
              this.$notify({
                title: '成功',
                message: '编辑角色成功',
                type: 'success'
              })
              this.$emit('modify-success')
            } else {
              this.$message.error('操作失败')
            }
          } else {
            const res = await addRole(this.addRoleForm)
            if (res.meta.status === 201) {
              this.$notify({
                title: '成功',
                message: '添加角色成功',
                type: 'success'
              })
              this.$emit('modify-success')
            } else {
              this.$message.error('操作失败')
            }
          }
          this.addDialogVisible = false
        }
      })
    }
  },

  watch: {
    roleForm(value, oldValue) {
      this.addRoleForm = value
    },
    showRoleForm(value) {
      this.addDialogVisible = value
    }
  }
}
</script>
<style lang='scss' scoped>
</style>
