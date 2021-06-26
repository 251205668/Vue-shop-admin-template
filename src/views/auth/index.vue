<template>
  <div>
    <!-- 面包屑 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>权限管理</el-breadcrumb-item>
      <el-breadcrumb-item>权限列表</el-breadcrumb-item>
    </el-breadcrumb>
    <el-card class="box-card">
      <el-table
        v-loading="listLoading"
        :data="list"
        border
        fit
        highlight-current-row
        style="width: 100%; margintop: -1px"
      >
        <el-table-column label="序号" prop="id" align="center" type="index" />
        <el-table-column label="权限名称" prop="authName" align="center">
        </el-table-column>
        <el-table-column label="路径">
          <template slot-scope="scope">
            <span class="link-type">{{ '/' + scope.row.path }}</span>
          </template>
        </el-table-column>
        <el-table-column label="权限等级">
          <template slot-scope="scope">
            <el-tag v-show="scope.row.level === '0'" type="success"
              >一级权限</el-tag
            >
            <el-tag v-show="scope.row.level === '1'" type="warning"
              >二级权限</el-tag
            >
            <el-tag v-show="scope.row.level === '2'" type="danger"
              >三级权限</el-tag
            >
          </template>
        </el-table-column>
      </el-table>
    </el-card>
  </div>
</template>

<script>
import { getAuthList } from '@/api/role'
export default {
  name: '',
  props: {},
  data() {
    return {
      list: [],
      listLoading: false
    }
  },

  components: {},
  created() {},

  computed: {},

  beforeMount() {},

  mounted() {
    this.initData()
  },

  methods: {
    async initData() {
      this.listLoading = true
      const res = await getAuthList()
      if (res.meta.status === 200) {
        this.listLoading = false
        this.list = res.data
      }
    }
  },

  watch: {}
}
</script>
<style lang='scss' scoped>
</style>
