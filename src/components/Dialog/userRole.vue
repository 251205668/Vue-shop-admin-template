<template>
  <el-dialog
    title="分配角色"
    :visible.sync="roleDialogVisible"
    width="46%"
    @close="handleClose"
  >
    <!-- 内容主体 -->
    <el-row :gutter="10">
      <el-col :span="4" :offset="0">当前用户:</el-col>
      <el-col :span="12" :offset="0">{{ currentUserInfo.username }}</el-col>
    </el-row>
    <el-row :gutter="10" style="margintop: 20px">
      <el-col :span="4" :offset="0">当前角色:</el-col>
      <el-col :span="12" :offset="0">{{ currentUserInfo.role_name }}</el-col>
    </el-row>
    <el-row :gutter="10" style="margintop: 20px">
      <el-col :span="4" :offset="0">分配角色:</el-col>
      <el-col :span="12" :offset="0">
        <el-select
          v-model="selectRoleId"
          filterable
          allow-create
          default-first-option
          placeholder="请选择用户角色"
        >
          <el-option
            v-for="item in roleList"
            :key="item.id"
            :label="item.roleName"
            :value="item.id"
          ></el-option>
        </el-select>
      </el-col>
    </el-row>

    <span slot="footer" class="dialog-footer">
      <el-button @click="handleClose">取 消</el-button>
      <el-button type="primary" @click="selectRole">确 定</el-button>
    </span>
  </el-dialog>
</template>

<script>
import { userSelectRole } from '@/api/user'
export default {
  name: '',
  props: {
    roleList: Array,
    currentUserInfo: Object,
    showRoleDialog: Boolean
  },
  data() {
    return {
      roleDialogVisible: false,
      userInfo: {},
      selectRoleId: ''
    }
  },

  components: {},
  created() {},

  computed: {},

  beforeMount() {},

  mounted() {},

  methods: {
    handleClose() {
      this.roleDialogVisible = false
      this.$emit('close', this.roleDialogVisible)
    },
    async selectRole() {
      const res = await userSelectRole(this.userInfo.id, this.selectRoleId)
      if (res.meta.status === 200) {
        this.$notify({
          title: '成功',
          message: '分配角色成功',
          type: 'success'
        })
        this.roleDialogVisible = false
        this.$emit('selectSuccess', this.roleDialogVisible)
      } else {
        this.$message.error('操作失败')
        this.handleClose()
      }
    }
  },

  watch: {
    currentUserInfo(value) {
      this.userInfo = value
    },
    showRoleDialog(value) {
      this.roleDialogVisible = value
    }
  }
}
</script>
<style lang='scss' scoped>
</style>
