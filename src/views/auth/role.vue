<template>
  <div>
     <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>权限管理</el-breadcrumb-item>
      <el-breadcrumb-item>角色列表</el-breadcrumb-item>
    </el-breadcrumb>
     <el-card class="box-card">
      <el-button type="primary" icon="el-icon-edit" size="default" >添加角色</el-button>
      <el-table
        v-loading="listLoading"
        :data="list"
        border
        fit
        highlight-current-row
        style="width:100%"
      >
        <el-table-column
          type="expand"
        />
        <el-table-column
          label="序号"
          prop="id"
          align="center"
          type="index"
        />
        <el-table-column
          label="角色名称"
          prop="roleName"
          align="center"
        >
        </el-table-column>
         <el-table-column
          label="角色描述"
          prop="roleDesc"
          align="center"
         >
        </el-table-column>
       <el-table-column
          label="操作"
          align="center"
          width="330"
          class-name="small-padding fixed-width"
       >
          <template slot-scope="{row}">
            <el-button type="success"  icon="el-icon-edit" size="mini" @click="handleEdit(row)">
              编辑
            </el-button>
            <el-button  type="danger" icon="el-icon-delete" size="mini" @click="handleDelete(row)">
              删除
            </el-button>
             <el-button type="warning" icon="el-icon-setting" size="mini" @click="handleSelect(row)">
              角色分配
            </el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
  </div>
</template>

<script>
import { getRoleList } from '@/api/role'
export default {
  name: '',
  props: {},
  data () {
    return {
      listLoading: false,
      list: []
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
      const res = await getRoleList()
      if (res.meta.status === 200) {
        this.listLoading = false
        this.list = res.data
      }
    },
    handleEdit(row) {

    },
    handleDelete(row) {

    },
    handleSelect(row) {

    }
  },

  watch: {}

}

</script>
<style lang='scss' scoped>

</style>
