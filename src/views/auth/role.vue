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
        <el-table-column type="expand">
          <template slot-scope="scope">
            <!-- 权限展示，一层嵌套一层 -->
            <el-row
              :class="[
                'border-bottom',
                index1 === 0 ? 'border-top' : '',
                'flex-center'
              ]"
              v-for="(item1, index1) of scope.row.children"
              :key="index1"
            >
              <!-- 一级权限 -->
              <el-col :span="5">
                <el-tag
                  @close="handleCloseTag(scope.row, item1.id)"
                  style="margin: 7px"
                  closable
                  >{{ item1.authName }}</el-tag
                >
                <i class="el-icon-caret-right"></i>
              </el-col>
              <el-col :span="19">
                <!-- 二级权限 -->
                <el-row
                  :class="[index2 === 0 ? '' : 'border-top', 'flex-center']"
                  v-for="(item2, index2) of item1.children"
                  :key="index2"
                >
                  <el-col :span="6">
                    <el-tag
                      @close="handleCloseTag(scope.row, item2.id)"
                      style="margin: 7px"
                      type="success"
                      closable
                      >{{ item2.authName }}</el-tag
                    >
                    <i class="el-icon-caret-right"></i>
                  </el-col>
                  <!--  三级权限 -->
                  <el-col :span="18">
                    <el-tag
                      v-for="(item3, index3) of item2.children"
                      style="margin: 7px"
                      :key="index3"
                      type="danger"
                      closable
                      @close="handleCloseTag(scope.row, item3.id)"
                      >{{ item3.authName }}</el-tag
                    >
                  </el-col>
                </el-row>
              </el-col>
            </el-row>
          </template>
        </el-table-column>
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
    <!-- 角色弹窗 -->
    <role-form
      @close="handleFormClose"
      :roleForm="roleForm"
      :showRoleForm="showRoleForm"
      @modify-success="handleSuccess"
    ></role-form>
    <!-- 分配权限弹窗 -->
    <auth-tree
      :showDialog="showAuthTree"
      :role="role"
      @close="handleTreeClose"
      @selectSuccess="handleTreeSuccess"
    ></auth-tree>
  </div>
</template>

<script>
import { getRoleList, deleteRole, deleteRoleAuth } from '@/api/role'
import RoleForm from '@/components/Dialog/roleForm.vue'
import AuthTree from '@/components/Dialog/authTree.vue'
export default {
  name: '',
  props: {},
  data() {
    return {
      listLoading: false,
      list: [],
      showRoleForm: false,
      showAuthTree: false,
      roleForm: {},
      role: {}
    }
  },

  components: {
    RoleForm,
    AuthTree
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
    // 分配角色权限
    handleSelect(row) {
      this.showAuthTree = true
      this.role = row
    },
    handleTreeClose(value) {
      this.showAuthTree = value
      this.role = {}
    },
    handleTreeSuccess() {
      this.showAuthTree = false
      this.initData()
    },
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
    },
    // 删除权限tag
    async handleCloseTag(role, id) {
      this.$confirm('此操作会永久删除该权限，是否继续？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(async () => {
          const res = await deleteRoleAuth(role.id, id)
          if (res.meta.status === 200) {
            this.$notify({
              title: '成功',
              message: '删除权限成功',
              type: 'success'
            })
            // 改变原表格数据即可
            role.children = res.data
          }
        })
        .catch(() => {
          this.$message.info('取消成功')
        })
    }
  },

  watch: {}
}
</script>
<style lang='scss' scoped>
.border-top {
  border-top: 1px solid #eee;
}
.border-bottom {
  border-bottom: 1px solid #eee;
}
.flex-center {
  display: flex;
  align-items: center;
}
</style>
