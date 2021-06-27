<template>
  <el-dialog
    title="分配权限"
    :visible.sync="setRightDialogVisible"
    width="50%"
    @close="handleClose"
  >
    <!-- props 定义接受的每一项数据格式 -->
    <!-- node-key 定义每一项传递的key值，此处为id -->
    <!-- default-checked-keys 默认选中的key数组 -->
    <el-tree
      :data="rightsList"
      :props="treeProps"
      ref="treeRef"
      show-checkbox
      node-key="id"
      default-expand-all
      :default-checked-keys="defKeys"
    ></el-tree>
    <span slot="footer" class="dialog-footer">
      <el-button type="danger" @click="handleClose">取 消</el-button>
      <el-button type="primary" @click="handleSubmit">确 定</el-button>
    </span>
  </el-dialog>
</template>

<script>
import { getAuthTree, modifyRoleAuth } from '@/api/role'
export default {
  name: '',
  props: {
    showDialog: Boolean,
    role: Object
  },
  data() {
    return {
      setRightDialogVisible: false,
      //  树形控件的属性绑定对象
      treeProps: {
        // 展示文字
        label: 'authName',
        // 子对象
        children: 'children'
      },
      // 树形控件数组
      rightsList: [],
      // 默认IDS
      defKeys: []
    }
  },

  components: {},
  created() {},

  computed: {},

  beforeMount() {},

  mounted() {},

  methods: {
    handleClose() {
      this.setRightDialogVisible = false
      // 关闭时清空默认选中数据
      this.defKeys = []
      this.$emit('close', this.setRightDialogVisible)
    },
    async handleSubmit() {
      // 获取当前选中和班选中的key数组
      const keys = [
        ...this.$refs.treeRef.getCheckedKeys(),
        ...this.$refs.treeRef.getHalfCheckedKeys()
      ]
      const res = await modifyRoleAuth(this.role.id, keys.join(','))
      if (res.meta.status === 200) {
        this.$notify({
          title: '成功',
          message: '分配角色权限成功',
          type: 'success'
        })
        this.$emit('selectSuccess')
        this.setRightDialogVisible = false
      } else {
        this.$message.error('操作失败')
      }
    },
    getDefIds(node, arr) {
      if (!node.children) {
        return arr.push(node.id)
      }
      node.children.forEach((item) => this.getDefIds(item, arr))
    }
  },
  watch: {
    async showDialog(value) {
      this.setRightDialogVisible = value
      if (value && this.role) {
        const res = await getAuthTree()
        if (res.meta.status === 200) {
          this.rightsList = res.data
          // 递归取出匹配该角色的权限id数组
          this.getDefIds(this.role, this.defKeys)
          console.log(this.rightsList, this.role, this.defKeys)
        }
      }
    }
  }
}
</script>
<style lang='scss' scoped>
</style>
