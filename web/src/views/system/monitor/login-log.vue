<template>
  <div class="sys-login-log-container">
    <table-layout class="table-layout">
      <template v-slot:headerLeft />
      <template v-slot:headerRight>
        <el-date-picker
          v-model="tableSearchParams.dateRange"
          value-format="yyyy-MM-dd HH:mm:ss"
          size="mini"
          type="daterange"
          align="right"
          unlink-panels
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
          :picker-options="pickerOptions"
        />
        <el-button size="mini" icon="el-icon-search" type="primary" style="margin-left: 10px;" @click="loadTableData">搜索</el-button>
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
        >
          <el-table-column type="index" width="30" />
          <el-table-column prop="username" label="登录名" align="center" width="200" />
          <el-table-column prop="ip" label="登录IP" align="center" />
          <el-table-column prop="createdAt" label="登录时间" align="center" />
          <el-table-column prop="os" label="操作系统" align="center" />
          <el-table-column prop="browser" label="浏览器" align="center" />
        </el-table>
      </template>
      <template v-slot:pagination>
        <pagination v-show="tablePagination.total>0" :total="tablePagination.total" :page.sync="tablePagination.currentPage" :limit.sync="tablePagination.pageSize" @pagination="loadTableData" />
      </template>
    </table-layout>
  </div>
</template>

<script>
import TableLayout from '@/layout/components/TableLayout'
import Pagination from '@/components/Pagination'
import { getLoginLogListByPage } from '@/services/system/login-log'
import { UAParser } from 'ua-parser-js'

export default {
  name: 'SystemLoginLog',
  components: {
    TableLayout,
    Pagination
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
        dateRange: ''
      },
      pickerOptions: {
        shortcuts: [{
          text: '最近一周',
          onClick(picker) {
            const end = new Date()
            const start = new Date()
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 7)
            picker.$emit('pick', [start, end])
          }
        }, {
          text: '最近一个月',
          onClick(picker) {
            const end = new Date()
            const start = new Date()
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 30)
            picker.$emit('pick', [start, end])
          }
        }, {
          text: '最近三个月',
          onClick(picker) {
            const end = new Date()
            const start = new Date()
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 90)
            picker.$emit('pick', [start, end])
          }
        }]
      }
      // 导出配置
    }
  },
  created() {
    this.loadTableData()
  },
  methods: {
    // 加载表格数据
    async loadTableData() {
      this.tableLoading = true
      const page = this.tablePagination.currentPage
      const limit = this.tablePagination.pageSize
      const dateRange = this.tableSearchParams.dateRange
      try {
        const { data } = await getLoginLogListByPage({ page, limit, dateRange })
        // UA 解析
        const uaParser = new UAParser()
        for (const item of data.list) {
          const uaResult = uaParser.setUA(item.ua).getResult()
          item.os = `${uaResult.os.name} ${uaResult.os.version}`
          item.browser = `${uaResult.browser.name} ${uaResult.browser.version}`
        }
        this.tableData = data.list
        this.tablePagination.total = data.pagination.total
        this.tableLoading = false
      } catch (e) {
        console.log(e)
        this.tableLoading = false
      }
    },
    // 刷新表格数据
    handleRefresh() {
      this.loadTableData()
    }
  }
}
</script>

<style lang="scss" scoped>
@import "~@/styles/table-layout.scss";

</style>
