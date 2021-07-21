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
      <el-form-item label="菜单类型" :label-width="labelWidth" prop="type">
        <el-radio v-model="form.type" label="directory">目录</el-radio>
        <el-radio v-model="form.type" label="menu">菜单</el-radio>
      </el-form-item>
      <el-form-item label="上级节点" :label-width="labelWidth" prop="parentId">
        <el-popover placement="bottom-start" width="500">
          <el-tree
            :style="{ 'max-height': '400px', 'overflow-y': 'auto' }"
            node-key="id"
            :expand-on-click-node="false"
            :data="menus"
            :props="{ children: 'children', label: 'label' }"
            @node-click="handleMenuNodeClick"
          />
          <el-input
            v-model="form.parentName"
            placeholder="请选择上级节点"
            readonly
          />
        </el-popover>
      </el-form-item>
      <el-form-item label="节点名称" :label-width="labelWidth" prop="name">
        <el-input v-model="form.name" autocomplete="off" />
      </el-form-item>
      <el-form-item label="节点路由" :label-width="labelWidth" prop="router">
        <el-input v-model="form.router" autocomplete="off" />
      </el-form-item>
      <el-form-item label="节点图标" :label-width="labelWidth" prop="icon">
        <icon-selector :value="form.icon" @selected="iconSelected" />
      </el-form-item>
      <el-form-item label="隐藏" :label-width="labelWidth" prop="isShow">
        <el-switch v-model="form.isHidden" />
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="close">取 消</el-button>
      <el-button type="primary" :loading="saving" @click="submit">确 定</el-button>
    </div>
  </el-dialog>
</template>

<script>
import _ from 'lodash'
import IconSelector from './icon-selector'
import { getMenu, createMenu, updateMenu } from '@/api/sys/sys-menu'

export default {
  components: {
    IconSelector
  },
  data() {
    return {
      // 通用属性
      visible: false,
      labelWidth: '80px',
      form: {
        id: '-1',
        parentId: null,
        parentName: null,
        name: null,
        router: null,
        type: 'directory',
        icon: null,
        orderNum: 0,
        viewPath: null,
        keepalive: false,
        isHidden: false
      },
      rules: [],
      loading: false,
      saving: false,

      // 业务属性
      menus: []
    }
  },
  computed: {
    title: () => {
      return this.form.id === '-1' ? '添加菜单' : '编辑菜单'
    }
  },
  methods: {
    // 通用逻辑
    open() {
      this.visible = true
      if (this.form.id === '-1') return
      getMenu()
    },
    close() {
      this.visible = false
      this.saving = false
      this.loading = false
      this.clearValidate()
    },
    closed() {
      // 重置form
      for (const key in this.form) {
        delete this.form[key]
      }
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
    clearValidate() {
      if (this.$refs.form) {
        this.$refs.form.clearValidate()
      }
    },
    submit() {
      this.$refs.form.validate(valid => {
        if (valid) {
          this.saving = true

          const data = _.cloneDeep(this.form)
          let res = null
          if (this.form.id === '-1') {
            res = createMenu(data)
          } else {
            res = updateMenu(data)
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
    // 业务逻辑
    iconSeleted(val) {
      this.form.icon = val
    },
    handleMenuNodeClick(data) {
      const { id, label } = data
      this.form.parentId = id
      this.form.parentName = label
    }
  }
}
</script>
