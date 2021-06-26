<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>权限管理</el-breadcrumb-item>
      <el-breadcrumb-item>角色列表</el-breadcrumb-item>
    </el-breadcrumb>
    <el-card class="box-card">
      <el-button
        type="primary"
        @click="handleRoleFrom"
        icon="el-icon-edit"
        size="default"
        >添加角色</el-button
      >
      <el-table
        v-loading="listLoading"
        :data="list"
        border
        fit
        highlight-current-row
        style="width: 100%"
      >
        <el-table-column type="expand" />
        <el-table-column label="序号" prop="id" align="center" type="index" />
        <el-table-column label="角色名称" prop="roleName" align="center">
        </el-table-column>
        <el-table-column label="角色描述" prop="roleDesc" align="center">
        </el-table-column>
        <el-table-column
          label="操作"
          align="center"
          width="330"
          class-name="small-padding fixed-width"
        >
          <template slot-scope="{ row }">
            <el-button
              type="success"
              icon="el-icon-edit"
              size="mini"
              @click="handleRoleFrom(row)"
            >
              编辑
            </el-button>
            <el-button
              type="danger"
              icon="el-icon-delete"
              size="mini"
              @click="handleDelete(row)"
            >
              删除
            </el-button>
            <el-button
              type="warning"
              icon="el-icon-setting"
              size="mini"
              @click="handleSelect(row)"
            >
              角色分配
            </el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
    <role-form
      @close="handleFormClose"
      :roleForm="roleForm"
      :showRoleForm="showRoleForm"
      @modify-success="handleSuccess"
    ></role-form>
  </div>
</template>

<script>
import { getRoleList, deleteRole } from '@/api/role'
import RoleForm from '@/components/Dialog/roleForm.vue'
export default {
  name: '',
  props: {},
  data() {
    return {
      listLoading: false,
      list: [],
      showRoleForm: false,
      roleForm: {}
    }
  },

  components: {
    RoleForm
  },
  created() {},

  computed: {},

  beforeMount() {},

  mounted() {
    this.initData()
  },

  methods: {
    async initData() {
      this.listLoading = true
      const res = await getRoleList()
      if (res.meta.status === 200) {
        this.listLoading = false
        this.list = res.data
      }
    },
    async handleDelete(row) {
      this.$confirm('此操作会永久删除该角色，是否继续？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(async () => {
          const res = await deleteRole(row.id)
          if (res.meta.status === 200) {
            this.$message.success('删除成功')
            this.initData()
          } else {
            this.$message.error('操作失败')
          }
        })
        .catch(() => {
          this.$message.info('取消成功')
        })
    },
    // 分配角色
    handleSelect(row) {},
    // 角色dialog回调
    handleFormClose(value) {
      this.showRoleForm = value
    },
    handleRoleFrom(row) {
      if (row.roleName) {
        this.roleForm = {
          ...row,
          type: 'edit'
        }
      } else {
        this.roleForm = {
          type: 'add'
        }
      }
      this.showRoleForm = true
    },
    handleSuccess() {
      this.showRoleForm = false
      this.initData()
    }
  },

  watch: {}
}
</script>
<style lang='scss' scoped>
</style>
