<template>
  <div class="sys-menu-container">
    <table-layout>
      <s-table ref="roleTable" :data-request="getRoleList" show-pagination stripe row-key="id" border>
        <template v-slot:prepend>
          <el-button size="mini" type="primary" :disabled="!$auth('sysRole.add')" @click="handleAdd">新增</el-button>
        </template>
        <el-table-column prop="id" label="#" align="center" width="55" />
        <el-table-column prop="name" label="名称" align="center" width="200" />
        <el-table-column prop="label" label="标识" align="center" width="200" />
        <el-table-column prop="remark" label="备注" align="center" />
        <el-table-column prop="createTime" label="创建时间" align="center" />
        <el-table-column prop="updateTime" label="更新时间" align="center" />
        <el-table-column label="操作" width="150" align="center" fixed="right">
          <template slot-scope="scope">
            <el-button size="mini" type="text" @click="handleEdit(scope.row)">编辑</el-button>
            <warning-confirm-button
              :closed="handleRefresh"
              @confirm="(o) => { handleDelete(scope.row, o) }"
            >删除</warning-confirm-button>
          </template>
        </el-table-column>
      </s-table>
    </table-layout>

    <role-form-dialog ref="formDialog" v-model="dialogVisible" :form-id="formId" @save-success="handleRefresh" />
  </div>
</template>

<script>
import roleFormDialog from './components/role-form-dialog'
import WarningConfirmButton from '@/components/WarningConfirmButton'
import TableLayout from '@/layout/components/TableLayout'
import STable from '@/components/Table'
import { getRoleListByPage, deleteRole } from '@/api/system/role'

export default {
  name: 'SystemPermissionRole',
  components: {
    TableLayout,
    STable,
    WarningConfirmButton,
    roleFormDialog
  },
  data() {
    return {
      dialogVisible: false,
      formId: ''
    }
  },
  methods: {
    async getRoleList({ page, limit }) {
      const { data } = await getRoleListByPage({ page, limit })
      return { list: data.list, pagination: { total: data.pagination.total }}
    },
    handleRefresh() {
      this.$refs.roleTable.refresh()
    },
    handleAdd() {
      this.dialogVisible = true
    },
    handleEdit(row) {
      this.formId = row.id
      this.dialogVisible = true
    },
    async handleDelete(row, { done, close }) {
      try {
        await deleteRole({ ids: [row.id] })
        close()
      } catch (e) {
        done()
      }
    }
  }
}
</script>

<style>

</style>
