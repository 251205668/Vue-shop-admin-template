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
      <el-button @click="handleClose">取 消</el-button>
      <el-button type="primary" @click="handleSubmit">确 定</el-button>
    </span>
  </el-dialog>
</template>

<script>
export default {
  name: '',
  props: {
    showDialog: Boolean,
    treeData: Array
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
    },
    handleSubmit() {}
  },
  watch: {
    showDialog(value) {
      this.setRightDialogVisible = value
    }
  }
}
</script>
<style lang='scss' scoped>
</style>
