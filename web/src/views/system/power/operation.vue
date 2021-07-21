<template>
  <div class="sys-perm-container">
    <table-layout>
      <s-table
        ref="menuTable"
        :data-request="getMenuList"
        row-key="id"
        border
        :tree-props="{ children: 'children', hasChildren: 'hasChildren' }"
        @row-click="handleRowClick"
      >
        <template v-slot:prepend>
          <el-button size="mini" type="primary" :disabled="!$auth('sysMenu.add')" @click="handleAdd">新增</el-button>
        </template>
        <el-table-column prop="name" label="名称" width="240">
          <template slot-scope="scope">
            <span style="margin-right: 16px">{{ scope.row.name }}</span>
            <el-tag
              v-if="!scope.row.isShow"
              type="danger"
              effect="dark"
              size="small"
            >隐藏</el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="icon" label="图标" width="60" align="center">
          <template slot-scope="scope">
            <svg-icon v-if="scope.row.icon" :icon-class="scope.row.icon" />
          </template>
        </el-table-column>
        <el-table-column prop="type" label="类型" width="80" align="center">
          <template slot-scope="scope">
            <el-tag size="small" effect="dark">{{
              getMenuType(scope.row.type)
            }}</el-tag>
          </template>
        </el-table-column>
        <el-table-column
          prop="router"
          label="节点路由"
          align="center"
          width="240"
        />
        <el-table-column
          prop="keepalive"
          label="路由缓存"
          width="80"
          align="center"
        >
          <template slot-scope="scope">
            <i
              v-if="scope.row.keepalive && scope.row.type === 1"
              class="el-icon-check"
            />
          </template>
        </el-table-column>
        <el-table-column
          prop="viewPath"
          label="文件路径"
          align="center"
          width="280"
        />
        <el-table-column
          prop="perms"
          label="权限"
          header-align="center"
          width="300"
        >
          <template slot-scope="scope">
            <el-tag
              v-for="i in splitPerms(scope.row.perms)"
              :key="i"
              effect="dark"
              size="mini"
              :style="{ 'margin-right': '3px' }"
            >{{ i }}</el-tag>
          </template>
        </el-table-column>
        <el-table-column
          prop="orderNum"
          label="排序号"
          width="80"
          align="center"
        />
        <el-table-column
          prop="updateTime"
          label="更新时间"
          width="180"
          align="center"
        />
        <el-table-column label="操作" width="150" align="center" fixed="right">
          <template slot-scope="scope">
            <el-button
              :disabled="!$auth('sysMenu.update')"
              size="mini"
              type="text"
              @click.stop="handleEdit(scope.row)"
            >编辑</el-button>
            <warning-confirm-button
              :closed="handleRefresh"
              :disabled="!$auth('sysMenu.delete')"
              @confirm="(o) => { handleDelete(scope.row, o) }"
            >删除</warning-confirm-button>
          </template>
        </el-table-column>
      </s-table>
    </table-layout>
    <!-- form dialog -->
    <menu-form-dialog ref="menuDialog" @save-success="handleRefresh" />
  </div>
</template>

<script>
import STable from '@/components/Table'
import MenuFormDialog from '../components/power-menu-form-dialog'
import WarningConfirmButton from '@/components/WarningConfirmButton'
import { getMenuList, deleteMenu } from '@/api/sys/sys-menu'
// import PowerMenuMixin from '@/core/mixins/power-menu'
import TableLayout from '@/layout/components/TableLayout.vue'

export default {
  name: 'SystemPowerMenu',
  components: {
    STable,
    MenuFormDialog,
    TableLayout,
    WarningConfirmButton
  },
  // mixins: [PowerMenuMixin],
  data() {
    return {
      menutree: []
    }
  },
  methods: {
    async getMenuList() {
      let { data } = await getMenuList()
      // data = data.map((item) => {
      //   return {
      //     id: item.id,
      //     parentId: item.parent_id,
      //     name: item.name,
      //     router: item.router,
      //     perms: item.perms,
      //     type: item.type,
      //     icon: item.icon,
      //     orderNum: item.order_num,
      //     viewPath: item.view_path,
      //     keepalive: item.keepalive,
      //     isShow: item.is_show
      //   }
      // })
      data = [
        {
          'createTime': '2020-08-28 10:09:26',
          'updateTime': '2021-05-21 16:30:14',
          'id': 1,
          'parentId': null,
          'name': '系统管理',
          'router': '/sys',
          'perms': null,
          'type': 'directory',
          'icon': 'system',
          'orderNum': 255,
          'viewPath': null,
          'keepalive': true,
          'isShow': true
        },
        {
          'createTime': '2020-09-04 09:41:43',
          'updateTime': '2020-09-24 09:16:56',
          'id': 23,
          'parentId': 3,
          'name': '角色列表',
          'router': '/sys/role',
          'perms': '',
          'type': 'menu',
          'icon': 'role',
          'orderNum': 0,
          'viewPath': 'views/system/role',
          'keepalive': true,
          'isShow': true
        },
        {
          'createTime': '2020-08-01 00:00:00',
          'updateTime': '2020-09-14 03:53:31',
          'id': 3,
          'parentId': 1,
          'name': '权限管理',
          'router': '/sys/power',
          'perms': null,
          'type': 'directory',
          'icon': 'permission',
          'orderNum': 0,
          'viewPath': '',
          'keepalive': true,
          'isShow': true
        },
        {
          'createTime': '2020-08-08 00:00:00',
          'updateTime': '2020-09-08 06:54:45',
          'id': 4,
          'parentId': 3,
          'name': '用户列表',
          'router': '/sys/user',
          'perms': null,
          'type': 'menu',
          'icon': 'peoples',
          'orderNum': 0,
          'viewPath': 'views/system/user',
          'keepalive': true,
          'isShow': true
        },
        {
          'createTime': '2020-08-08 00:00:00',
          'updateTime': '2020-09-24 09:51:40',
          'id': 7,
          'parentId': 3,
          'name': '菜单列表',
          'router': '/sys/power/menu',
          'perms': null,
          'type': 'menu',
          'icon': 'menu',
          'orderNum': 0,
          'viewPath': 'views/system/power/menu',
          'keepalive': true,
          'isShow': true
        }
      ]

      // clean
      if (this.menutree && this.menutree.length > 0) {
        this.menutree = []
      }
      // 同时缓存树形菜单
      const parentNode = { id: '-1', label: '一级菜单' }
      parentNode.children = this.filterMenuToTree(data, null)
      this.menutree.push(parentNode)

      return { list: this.filterMenuToTable(data, null) }
    },
    /**
     * 将对应菜单类型转为字符串字意
     */
    getMenuType(type) {
      switch (type) {
        case 'directory':
          return '目录'
        case 'menu':
          return '菜单'
      }
    },
    handleRowClick(row) {
      this.$refs.menuTable.getTable().toggleRowExpansion(row)
    },
    handleRefresh() {
      this.$refs.menuTable.refresh()
    },
    handleAdd() {
      this.$refs.menuDialog.open(this.menutree)
    },
    handleEdit(item) {
      this.$refs.menuDialog.open(this.menutree, item.id)
    },
    async handleDelete(row, { close, done }) {
      try {
        await deleteMenu({ menuId: row.id })
        close()
      } catch (e) {
        done()
      }
    }
  }
}
</script>
