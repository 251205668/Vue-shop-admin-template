<template>
  <div>
    <!-- 面包屑 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>用户管理</el-breadcrumb-item>
      <el-breadcrumb-item>用户列表</el-breadcrumb-item>
    </el-breadcrumb>

    <el-card class="box-card">
      <!-- 顶部操作栏 -->
      <el-row :gutter="20">
        <el-col :span="8">
          <el-input
            placeholder="请输入查询条件"
            v-model="keywords"
            @clear="handleClear"
            @keyup.enter.native="handleSearch"
            size="normal"
            clearable
          >
            <el-button
              slot="append"
              @click="handleSearch"
              icon="el-icon-search"
            ></el-button>
          </el-input>
        </el-col>
        <el-col :span="6">
          <el-button
            type="primary"
            style="height: 40px"
            icon="el-icon-edit"
            @click="handleAddUser"
          >
            添加用户
          </el-button>
        </el-col>
      </el-row>
      <!-- 数据表格 -->
      <el-table
        v-loading="listLoading"
        :data="list"
        border
        fit
        highlight-current-row
        style="width: 100%"
      >
        <el-table-column
          sortable
          prop="id"
          label="序号"
          align="center"
          width="80"
        >
        </el-table-column>
        <el-table-column label="用户名" prop="username" align="center">
          <template slot-scope="scope">
            <span @click="handleEdit(scope.row)" class="link-type">{{
              scope.row.username
            }}</span>
          </template>
        </el-table-column>
        <el-table-column label="邮箱" prop="email" align="center">
        </el-table-column>
        <el-table-column label="电话" prop="mobile" align="center">
        </el-table-column>
        <el-table-column label="创建时间" align="center">
          <template slot-scope="scope">
            <span>{{ scope.row.create_time | moment }}</span>
          </template>
        </el-table-column>
        <el-table-column label="状态" align="center">
          <template slot-scope="scope">
            <el-switch
              v-model="scope.row.mg_state"
              @change="userStateChanged(scope.row)"
            ></el-switch>
          </template>
        </el-table-column>
        <el-table-column
          label="操作"
          align="center"
          width="260"
          class-name="small-padding fixed-width"
        >
          <template slot-scope="{ row }">
            <el-button type="primary" size="mini" @click="handleEdit(row)">
              编辑
            </el-button>
            <el-button type="danger" size="mini" @click="handleDelete(row)">
              删除
            </el-button>
            <el-button type="success" size="mini" @click="handleSelect(row)">
              角色分配
            </el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        :background="true"
        :page-sizes="[5, 10, 20, 30]"
        :page-size="pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="totals"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      />
    </el-card>
    <!-- 添加用户弹窗 -->
    <user-form
      :showDialog="showUserFormDialog"
      @close="handleClose"
      @addUser="handleAdd"
    ></user-form>
    <!-- 修改用户弹窗 -->
    <user-edit
      :showEditDialog="showUserEditDialog"
      @close="handleEditClose"
      @editSuccess="handleEditSuccess"
      :userInfo="userInfo"
    ></user-edit>
    <!-- 分配角色弹窗 -->
    <user-role
      :roleList="roleList"
      :currentUserInfo="roleUserInfo"
      @close="handleRoleCLose"
      :showRoleDialog="showRoleDialog"
      @selectSuccess="handleSlectSuccess"
    ></user-role>
  </div>
</template>

<script>
import {
  getUserList,
  modifyState,
  getUserInfoById,
  deleteUserById,
  getRoles
} from '@/api/user'
import UserForm from '@/components/Dialog/userForm.vue'
import UserEdit from '@/components/Dialog/userEditFrom.vue'
import UserRole from '@/components/Dialog/userRole'
import moment from 'moment'
export default {
  name: '',
  props: {},
  data() {
    return {
      keywords: '',
      listLoading: false,
      list: [],
      pageNum: 1,
      pageSize: 10,
      totals: 0,
      showUserFormDialog: false,
      showUserEditDialog: false,
      showRoleDialog: false,
      userInfo: {},
      roleUserInfo: {},
      roleList: []
    }
  },

  components: {
    UserForm,
    UserEdit,
    UserRole
  },
  filters: {
    moment(date) {
      // 两显示为几天前
      if (moment(date).isBefore(moment().subtract(7, 'days'))) {
        return moment.unix(date).format('YYYY-MM-DD HH:mm:ss')
      } else {
        return moment(date).fromNow()
      }
    }
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
      const res = await getUserList(this.keywords, this.pageNum, this.pageSize)
      if (res.meta.status === 200) {
        this.listLoading = false
        this.list = res.data.users
        this.totals = res.data.total
      }
    },
    async userStateChanged(row) {
      const { id, mg_state: state } = row
      const res = await modifyState(id, state)
      this.listLoading = true
      if (res.meta.status === 200) {
        this.listLoading = false
        this.$message.success('修改用户状态成功')
        this.initData()
      } else {
        this.$message.error('修改用户状态失败')
      }
    },
    // 按钮监听
    async handleEdit(row) {
      const res = await getUserInfoById(row.id)
      if (res.meta.status === 200) {
        this.userInfo = res.data
        this.userInfo.username = row.username
        this.showUserEditDialog = true
      }
    },
    handleDelete(row) {
      this.$confirm('此操作会永久删除该用户，是否继续？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(async () => {
          const res = await deleteUserById(row.id)
          if (res.meta.status === 200) {
            this.$notify({
              title: '成功',
              message: '删除用户成功',
              type: 'success'
            })
            this.initData()
          } else {
            this.$message.error('操作失败')
          }
        })
        .catch(() => {
          this.$message.info('取消成功')
        })
    },
    async handleSelect(row) {
      const res = await getRoles()
      if (res.meta.status === 200) {
        this.roleList = res.data
        this.roleUserInfo = row
        this.showRoleDialog = true
      }
    },

    // 分配角色弹窗回调
    handleRoleCLose(value) {
      this.showRoleDialog = value
    },
    handleSlectSuccess() {
      this.showRoleDialog = false
      this.initData()
    },

    // 修改弹窗回调
    handleEditClose(value) {
      this.showUserEditDialog = value
    },
    handleEditSuccess() {
      this.showUserEditDialog = false
      this.initData()
    },
    // 添加用户弹窗回调
    handleAddUser() {
      this.showUserFormDialog = true
    },
    handleAdd(code) {
      if (code === 201) {
        this.showUserFormDialog = false
        this.initData()
      }
    },
    handleClose(value) {
      this.showUserFormDialog = value
    },

    handleSearch() {
      this.initData()
    },
    handleClear() {
      this.initData()
    },
    // 分页器监听函数
    handleSizeChange(value) {
      this.pageSize = value
      this.initData()
    },
    handleCurrentChange(value) {
      this.pageNum = value
      this.initData()
    }
  },

  watch: {}
}
</script>
<style lang="scss" scoped></style>
