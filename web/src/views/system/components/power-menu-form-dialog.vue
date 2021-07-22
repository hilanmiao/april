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
        <el-popover
          v-model="popoverVisible"
          placement="bottom-start"
          width="300"
          trigger="click"
        >
          <el-scrollbar wrap-style="max-height: 300px;">
            <el-tree
              node-key="id"
              :expand-on-click-node="false"
              :data="menus"
              :props="{ children: 'children', label: 'label' }"
              @node-click="handleMenuNodeClick"
            />
          </el-scrollbar>
          <el-input
            slot="reference"
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
      <el-form-item v-show="form.type === 'menu'" label="隐藏" :label-width="labelWidth" prop="isHidden">
        <el-switch v-model="form.isHidden" />
      </el-form-item>
      <el-form-item v-show="form.type === 'menu'" label="是否缓存" :label-width="labelWidth" prop="keepalive">
        <el-switch v-model="form.keepalive" />
      </el-form-item>
      <el-form-item v-show="form.type === 'menu'" label="文件路径" :label-width="labelWidth">
        <el-select
          v-model="form.viewPath"
          placeholder="请选择文件路径"
          style="width: 100%;"
        >
          <el-option
            v-for="item in getViewFiles()"
            :key="item"
            :label="item"
            :value="item"
          />
        </el-select>
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
import { getMenu, createMenu, updateMenu } from '@/api/system/menu'
import { constantRouterComponents } from '@/router'

export default {
  components: {
    IconSelector
  },
  model: {
    prop: 'dialogVisible',
    event: 'close'
  },
  props: {
    menutree: {
      type: Array,
      required: true
    },
    dialogVisible: {
      type: Boolean,
      required: true
    }
  },
  data() {
    return {
      // 通用属性
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
      rules: {
        name: [{ required: true, message: '必填', trigger: 'blur' }],
        parentId: [{ required: true, message: '必填', trigger: 'input' }],
        router: [{ required: true, message: '必填', trigger: 'blur' }]
        // viewPath: [{ required: true, message: '必填', trigger: 'blur' }]
      },
      loading: false,
      saving: false,
      popoverVisible: false
      // 业务属性
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
      return this.form.id === '-1' ? '添加菜单' : '编辑菜单'
    },
    menus() {
      return this.menutree
    }
  },
  methods: {
    // 通用逻辑
    open() {
      if (this.form.id === '-1') return
      getMenu(this.form.id)
        .then(res => {
          const { menu, parentMenu } = res.data
          this.form.parentId = parentMenu ? menu.parentId : '-1'
          this.form.parentName = parentMenu ? parentMenu.name : '一级菜单'
        })
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
    clearValidate(props) {
      if (this.$refs.form) {
        this.$refs.form.clearValidate(props)
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
              this.$emit('handleRefresh')
              this.close()
            })
            .catch(() => {
              this.done()
            })
        }
      })
    },
    // 业务逻辑
    iconSelected(val) {
      this.form.icon = val
    },
    handleMenuNodeClick(data) {
      const { id, label } = data
      this.form.parentId = id
      this.form.parentName = label
      this.popoverVisible = false
    },
    getViewFiles() {
      return Object.keys(constantRouterComponents)
    }
  }
}
</script>
