<template>
  <div class="sys-oneline-user-container">
    <table-layout class="table-layout">
      <template v-slot:headerLeft>
        <warning-confirm-button
          button-type="danger"
          :content="`确认批量下线 ${tableMultipleSelection.length} 个用户？`"
          :closed="handleRefresh"
          @confirm="(o) => { handleBulkKick(o) }"
        >批量下线</warning-confirm-button>
      </template>
      <template v-slot:headerRight>
        <el-input v-model="tableSearchParams.name" size="mini" placeholder="请输入用户名称" class="search-input">
          <el-button slot="append" icon="el-icon-search" type="primary" @click="loadTableData">搜索</el-button>
        </el-input>
        <span class="line">|</span>
        <el-button size="mini" icon="el-icon-refresh" @click="handleRefresh" />
        <el-button size="mini" icon="el-icon-download" />
      </template>
      <template>
        <el-table
          v-loading="tableLoading"
          class="has-checkbox"
          :data="tableData"
          size="small"
          :header-cell-style="{ backgroundColor: '#ebeef4' }"
          border
          fit
          highlight-current-row
          style="width: 100%;"
          @selection-change="handleSelectionChange"
        >
          <el-table-column type="index" width="30" />
          <el-table-column type="selection" align="center" width="30" />
          <el-table-column prop="username" label="用户名" align="center">
            <template slot-scope="{row}">
              {{ row.username }}, {{ row.createdAt }}
            </template>
          </el-table-column>
          <el-table-column prop="createdAt" label="连接时间" align="center">
            <template slot-scope="{row}">
              {{ dayjs(parseInt(row.createdAt)).format('YYYY-MM-DD HH:mm:ss:SSS') }}
            </template>
          </el-table-column>>
          <el-table-column label="操作" width="150" align="center">
            <template slot-scope="scope">
              <warning-confirm-button
                :closed="handleRefresh"
                @confirm="(o) => { handleKick(scope.row, o) }"
              >下线</warning-confirm-button>
            </template>
          </el-table-column>
        </el-table>
      </template>
      <template v-slot:pagination>
        <pagination v-show="tablePagination.total>0" :total="tablePagination.total" :page.sync="tablePagination.currentPage" :limit.sync="tablePagination.pageSize" @pagination="loadTableData" />
      </template>
    </table-layout>
  </div>
</template>

<script>
import _ from 'lodash'
import WarningConfirmButton from '@/components/WarningConfirmButton'
import TableLayout from '@/layout/components/TableLayout'
import Pagination from '@/components/Pagination'
import { onlineUserService } from '@/services'

export default {
  name: 'SystemOnelineUser',
  components: {
    TableLayout,
    Pagination,
    WarningConfirmButton
  },
  data() {
    return {
      // 列表相关
      tableData: [],
      tableLoading: false,
      tablePagination: {
        total: 0,
        pageSize: 10,
        currentPage: 1
      },
      tableSearchParams: {
        name: ''
      },
      tablePaginationDefault: null,
      tableSearchParamsDefault: null,
      tableMultipleSelection: []
      // 导出配置
    }
  },
  created() {
    this.loadTableData()
    // 拷贝默认值
    this.tablePaginationDefault = _.cloneDeep(this.tablePagination)
    this.tableSearchParamsDefault = _.cloneDeep(this.tableSearchParams)
  },
  destroyed() {
    this.tablePaginationDefault = null
    this.tableSearchParamsDefault = null
  },
  methods: {
    // 加载表格数据
    async loadTableData() {
      this.tableLoading = true
      const page = this.tablePagination.currentPage
      const limit = this.tablePagination.pageSize
      const name = this.tableSearchParams.name
      try {
        const response = await onlineUserService.getOnlineUserListByPage({ page, limit, name })
        const { data } = response.data
        this.tableData = data.list
        this.tablePagination.total = data.pagination.total
        this.tableLoading = false
      } catch (e) {
        console.error('onelineUser.getOnelineUserListByPage-error:', e)
        this.tableLoading = false
        const errorMessage = e && e.data.message || '发生了一些未知的错误，请重试！'
        this.$message.error(errorMessage)
      }
    },
    // 多选框选择事件
    handleSelectionChange(selection) {
      this.tableMultipleSelection = selection
    },
    // 刷新表格数据
    handleRefresh() {
      // 重置
      this.tablePagination = _.cloneDeep(this.tablePaginationDefault)
      this.tableSearchParams = _.cloneDeep(this.tableSearchParamsDefault)

      this.loadTableData()
    },
    // 删除
    async handleKick(row, { done, close }) {
      try {
        await onlineUserService.kickUser({ ids: [row.id] })
        close()
      } catch (e) {
        console.error('onelineUser.kickUser-error:', e)
        done()
        const errorMessage = e && e.data.message || '发生了一些未知的错误，请重试！'
        this.$message.error(errorMessage)
      }
    },
    // 批量删除
    async handleBulkKick({ done, close }) {
      try {
        const ids = _.map(this.tableMultipleSelection, 'id')
        await onlineUserService.kickUser({ ids })
        close()
      } catch (e) {
        done()
        console.error('onelineUser.kickUser-error:', e)
        done()
        const errorMessage = e && e.data.message || '发生了一些未知的错误，请重试！'
        this.$message.error(errorMessage)
      }
    }
  }
}
</script>

<style lang="scss" scoped>
@import "~@/styles/table-layout.scss";

</style>
