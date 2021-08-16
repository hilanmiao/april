<template>
  <el-dialog
    :title="title"
    width="50%"
    :close-on-click-modal="false"
    :append-to-body="true"
    :center="true"
    :visible.sync="visible"
    @open="open"
    @close="close"
    @closed="closed"
  >
    <el-form ref="form" label-position="right" :model="form" :rules="rules">
      <el-row>
        <el-col>
          <el-form-item label="名称" :label-width="labelWidth" prop="name">
            <el-input v-model="form.name" autocomplete="off" />
          </el-form-item>
        </el-col>
        <!--        <el-col :span="12">-->
        <!--          <el-form-item label="标识" :label-width="labelWidth" prop="label">-->
        <!--            <el-input v-model="form.label" autocomplete="off" />-->
        <!--          </el-form-item>-->
        <!--        </el-col>-->
      </el-row>
      <el-form-item label="备注" :label-width="labelWidth" prop="remark">
        <el-input v-model="form.remark" autocomplete="off" type="textarea" />
      </el-form-item>
      <el-row>
        <el-col :span="12">
          <el-form-item label="菜单权限" :label-width="labelWidth" prop="powerMenu">
            <el-tree
              ref="treeMenu"
              class="role-form-dialog-tree-container"
              node-key="id"
              :show-checkbox="true"
              :highlight-current="true"
              :expand-on-click-node="false"
              :default-expand-all="true"
              :data="menus"
              :props="{ children: 'children', label: 'label' }"
            />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="操作权限" :label-width="labelWidth" prop="powerOperation" />
        </el-col>
      </el-row>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-row type="flex" justify="end">
        <el-button size="mini" @click="close">取 消</el-button>
        <el-button size="mini" type="primary" :loading="saving" @click="submit">确 定</el-button>
      </el-row>
    </div>
  </el-dialog>
</template>

<script>
import _ from 'lodash'
import { getMenuList } from '@/api/system/power'
import { createRole, updateRole, getRole } from '@/api/system/role'
import PowerMenuMixin from '@/core/mixins/power-menu'
import { listCamelCase } from '@/utils'

export default {
  components: {

  },
  mixins: [PowerMenuMixin],
  model: {
    prop: 'dialogVisible',
    event: 'close'
  },
  props: {
    dialogVisible: {
      type: Boolean,
      required: true
    },
    formId: {
      type: String
    }
  },
  data() {
    return {
      // 通用属性
      labelWidth: '80px',
      form: {
        id: '-1',
        name: '',
        remark: '',
        powerMenus: [],
        powerOperations: []
      },
      rules: {
        name: [{ required: true, message: '必填', trigger: 'blur' }]
      },
      loading: false,
      saving: false,
      // 业务属性
      menus: [],
      operations: []
    }
  },
  computed: {
    visible: {
      get() {
        // 父组件向下传递dialogVisible的值时通过计算属性赋值到visible
        return this.dialogVisible
      },
      set() {
        // 当dialog关闭时，会触发this.visible = false，从而来到这个方法，我们在这里将关闭事件同步给父组件
        this.$emit('close', false)
      }
    },
    title() {
      return this.form.id === '-1' ? '添加角色' : '编辑角色'
    }
  },
  watch: {
    formId: {
      immediate: true,
      handler: function(val) {
        this.form.id = val
      }
    }
  },
  methods: {
    open() {
      this.init()
      // 添加
      if (this.form.id === '-1') return
      // 编辑
      this.setData()
    },
    // 初始化数据事件等
    async init() {
      let { data: menusData } = await getMenuList()
      // 下划线转驼峰
      menusData = listCamelCase(menusData)
      this.menus = this.filterMenuToTree(menusData, null)
    },
    // 设置数据
    async setData() {
      const { data: role } = await getRole({ id: this.form.id })
      const { name, remark, system_role_powers: powerMenus } = role
      console.log(powerMenus)
      this.form.name = name
      this.form.remark = remark
      // 设置节点
      if (powerMenus && powerMenus.length > 0) {
        powerMenus.forEach(o => {
          const node = this.$refs.treeMenu.getNode(o.id)
          console.log(node)
          if (node && node.isLeaf) {
            this.$refs.treeMenu.setChecked(node, true)
          }
        })
      }
    },
    close() {
      this.visible = false
      this.saving = false
      this.loading = false
      this.clearValidate()
    },
    closed() {
      // 重置form
      // for (const key in this.form) {
      //   delete this.form[key]
      // }
      this.resetFields()
    },
    done() {
      this.saving = false
    },
    validate(callback) {
      if (this.$refs.form) {
        this.$refs.form.validate(callback)
      }
    },
    resetFields() {
      if (this.$refs.form) {
        this.$refs.form.resetFields()
      }
    },
    clearValidate(props) {
      if (this.$refs.form) {
        this.$refs.form.clearValidate(props)
      }
    },
    submit() {
      // 提交前处理
      this.form.powerMenus = this.getTreeMenuCheckedKeys()

      // 提交通用处理
      this.$refs.form.validate(valid => {
        if (valid) {
          this.saving = true
          const data = _.cloneDeep(this.form)
          let res = null
          if (data.id === '-1') {
            res = createRole(data)
          } else {
            res = updateRole(data)
          }
          res
            .then(() => {
              this.$emit('save-success')
              this.close()
            })
            .catch(() => {
              this.done()
            })
        }
      })
    },
    getTreeMenuCheckedKeys() {
      const childKeys = this.$refs.treeMenu.getCheckedKeys()
      const halfKeys = this.$refs.treeMenu.getHalfCheckedKeys()
      return [...childKeys, ...halfKeys]
    }
  }
}
</script>
<style lang="scss" scoped>
.role-form-dialog-tree-container {
  height: 300px;
  padding-top: 5px;
  overflow: auto;
  border-radius: 6px;
  border: 1px solid #dcdfe6;

&:hover {
   border-color: #C0C4CC;
 }
}
</style>
