import { login, getBaseInfo, getPermmenu } from '@/api/login'
import { logout } from '@/api/login'
import { setToken, removeToken } from '@/utils/auth'
import { resetRouter } from '@/router'

const state = {
  token: '',
  name: '',
  avatar: '',
  // like [ 'sys:user:add', 'sys:user:update' ]
  perms: []
}

const mutations = {
  RESET_STATE: state => {
    state.token = ''
    state.name = ''
    state.avatar = ''
    state.perms = []
  },
  SET_TOKEN: (state, token) => {
    state.token = token
  },
  SET_NAME: (state, name) => {
    state.name = name
  },
  SET_AVATAR: (state, avatar) => {
    state.avatar = avatar
  },
  SET_PERMS: (state, perms) => {
    state.perms = perms
  }
}

const actions = {
  // 管理员登录
  login({ commit }, loginInfo) {
    const { username, password, captchaId, verifyCode } = loginInfo
    return new Promise((resolve, reject) => {
      login({
        username: username.trim(),
        password: password.trim(),
        captchaId: captchaId.trim(),
        verifyCode: verifyCode.trim()
      })
        .then(response => {
          const { data } = response
          commit('SET_TOKEN', data.accessToken)
          setToken(data.accessToken)
          resolve()
        })
        .catch(error => {
          reject(error)
        })
    })
  },

  // 初始化用户及权限信息
  getInfo({ commit, dispatch }) {
    return new Promise((resolve, reject) => {
      Promise.all([getPermmenu(), getBaseInfo()]).then((results) => {
        const pm = results[0].data
        // const pm = { 'menus': [{ 'createTime': '2021-05-16 01:40:27', 'updateTime': '2021-05-16 01:40:27', 'id': 75, 'parentId': 73, 'name': '创建文件夹', 'router': null, 'perms': 'netdisk:manage:mkdir', 'type': 2, 'icon': null, 'orderNum': 255, 'viewPath': null, 'keepalive': true, 'isShow': true }, { 'createTime': '2021-05-16 01:40:03', 'updateTime': '2021-05-16 01:40:03', 'id': 74, 'parentId': 73, 'name': '查询', 'router': null, 'perms': 'netdisk:manage:list', 'type': 2, 'icon': null, 'orderNum': 255, 'viewPath': null, 'keepalive': true, 'isShow': true }, { 'createTime': '2020-08-28 10:09:26', 'updateTime': '2021-05-21 16:30:14', 'id': 1, 'parentId': null, 'name': '系统管理', 'router': '/sys', 'perms': null, 'type': 0, 'icon': 'system', 'orderNum': 255, 'viewPath': null, 'keepalive': true, 'isShow': true }, { 'createTime': '2021-05-16 01:40:42', 'updateTime': '2021-05-16 01:40:42', 'id': 76, 'parentId': 73, 'name': '上传', 'router': null, 'perms': 'netdisk:manage:token', 'type': 2, 'icon': null, 'orderNum': 255, 'viewPath': null, 'keepalive': true, 'isShow': true }, { 'createTime': '2021-05-16 01:42:17', 'updateTime': '2021-05-16 01:42:17', 'id': 80, 'parentId': 73, 'name': '预览', 'router': null, 'perms': 'netdisk:manage:info', 'type': 2, 'icon': null, 'orderNum': 255, 'viewPath': null, 'keepalive': true, 'isShow': true }, { 'createTime': '2021-05-16 01:41:15', 'updateTime': '2021-05-16 01:41:15', 'id': 78, 'parentId': 73, 'name': '下载', 'router': null, 'perms': 'netdisk:manage:download', 'type': 2, 'icon': null, 'orderNum': 255, 'viewPath': null, 'keepalive': true, 'isShow': true }, { 'createTime': '2021-05-27 15:30:32', 'updateTime': '2021-05-27 15:30:32', 'id': 84, 'parentId': 72, 'name': '网盘概览', 'router': '/netdisk/overview', 'perms': null, 'type': 1, 'icon': 'disk-overview', 'orderNum': 255, 'viewPath': 'views/netdisk/overview', 'keepalive': true, 'isShow': true }, { 'createTime': '2020-09-14 03:56:24', 'updateTime': '2021-04-26 16:06:32', 'id': 44, 'parentId': null, 'name': '文档', 'router': '/document', 'perms': '', 'type': 0, 'icon': 'documentation', 'orderNum': 255, 'viewPath': '', 'keepalive': true, 'isShow': true }, { 'createTime': '2021-05-16 01:38:40', 'updateTime': '2021-05-16 01:38:40', 'id': 72, 'parentId': null, 'name': '网盘空间', 'router': '/netdisk', 'perms': null, 'type': 0, 'icon': 'netdisk', 'orderNum': 255, 'viewPath': null, 'keepalive': true, 'isShow': true }, { 'createTime': '2021-05-16 23:42:36', 'updateTime': '2021-05-16 23:42:36', 'id': 81, 'parentId': 73, 'name': '备注', 'router': null, 'perms': 'netdisk:manage:mark', 'type': 2, 'icon': null, 'orderNum': 255, 'viewPath': null, 'keepalive': true, 'isShow': true }, { 'createTime': '2021-05-16 01:39:06', 'updateTime': '2021-05-16 01:39:06', 'id': 73, 'parentId': 72, 'name': '空间管理', 'router': '/netdisk/manage', 'perms': null, 'type': 1, 'icon': 'netdisk-manage', 'orderNum': 255, 'viewPath': 'views/netdisk/manage', 'keepalive': true, 'isShow': true }, { 'createTime': '2021-04-12 04:28:03', 'updateTime': '2021-04-20 10:18:22', 'id': 20, 'parentId': 4, 'name': '部门移动排序', 'router': null, 'perms': 'sys:dept:move', 'type': 2, 'icon': null, 'orderNum': 255, 'viewPath': null, 'keepalive': true, 'isShow': true }, { 'createTime': '2020-09-07 02:50:03', 'updateTime': '2020-09-14 03:56:47', 'id': 27, 'parentId': 44, 'name': 'TypeORM中文文档', 'router': 'https://www.bookstack.cn/read/TypeORM-0.2.20-zh/README.md', 'perms': '', 'type': 1, 'icon': 'international', 'orderNum': 2, 'viewPath': 'views/error-log/components/ErrorTestB', 'keepalive': true, 'isShow': true }, { 'createTime': '2020-09-04 09:41:43', 'updateTime': '2020-09-24 09:16:56', 'id': 23, 'parentId': 3, 'name': '角色列表', 'router': '/sys/permission/role', 'perms': '', 'type': 1, 'icon': 'role', 'orderNum': 0, 'viewPath': 'views/system/permission/role', 'keepalive': true, 'isShow': true }, { 'createTime': '2020-10-19 03:09:42', 'updateTime': '2020-10-19 03:09:42', 'id': 61, 'parentId': 58, 'name': '更新', 'router': '', 'perms': 'sys:task:update', 'type': 2, 'icon': '', 'orderNum': 0, 'viewPath': '', 'keepalive': true, 'isShow': true }, { 'createTime': '2020-10-19 07:30:18', 'updateTime': '2020-10-19 07:30:18', 'id': 66, 'parentId': 57, 'name': '任务日志', 'router': '/sys/schedule/log', 'perms': null, 'type': 1, 'icon': 'schedule-log', 'orderNum': 0, 'viewPath': 'views/system/schedule/log', 'keepalive': true, 'isShow': true }, { 'createTime': '2020-09-09 07:10:08', 'updateTime': '2020-09-10 03:41:32', 'id': 34, 'parentId': 4, 'name': '查询', 'router': '', 'perms': 'sys:user:page,sys:user:info', 'type': 2, 'icon': '', 'orderNum': 0, 'viewPath': '', 'keepalive': true, 'isShow': true }, { 'createTime': '2020-09-10 08:02:29', 'updateTime': '2020-09-10 08:02:40', 'id': 36, 'parentId': 4, 'name': '部门转移', 'router': '', 'perms': 'sys:dept:transfer', 'type': 2, 'icon': '', 'orderNum': 0, 'viewPath': '', 'keepalive': true, 'isShow': true }, { 'createTime': '2020-09-11 06:13:23', 'updateTime': '2020-09-11 06:13:23', 'id': 40, 'parentId': 4, 'name': '部门删除', 'router': '', 'perms': 'sys:dept:delete', 'type': 2, 'icon': '', 'orderNum': 0, 'viewPath': '', 'keepalive': true, 'isShow': true }, { 'createTime': '2020-09-04 08:08:53', 'updateTime': '2020-09-04 08:08:53', 'id': 19, 'parentId': 7, 'name': '修改', 'router': '', 'perms': 'sys:menu:update', 'type': 2, 'icon': '', 'orderNum': 0, 'viewPath': '', 'keepalive': true, 'isShow': true }, { 'createTime': '2020-10-13 03:01:13', 'updateTime': '2020-10-13 03:01:13', 'id': 52, 'parentId': 51, 'name': '查询', 'router': '', 'perms': 'sys:online:list', 'type': 2, 'icon': '', 'orderNum': 0, 'viewPath': '', 'keepalive': true, 'isShow': true }, { 'createTime': '2020-09-11 04:34:00', 'updateTime': '2020-09-14 03:29:59', 'id': 37, 'parentId': 1, 'name': '系统监控', 'router': '/sys/monitor', 'perms': '', 'type': 0, 'icon': 'monitor', 'orderNum': 0, 'viewPath': '', 'keepalive': true, 'isShow': true }, { 'createTime': '2020-10-19 05:45:30', 'updateTime': '2020-10-19 05:45:30', 'id': 62, 'parentId': 58, 'name': '执行一次', 'router': '', 'perms': 'sys:task:once', 'type': 2, 'icon': '', 'orderNum': 0, 'viewPath': '', 'keepalive': true, 'isShow': true }, { 'createTime': '2020-10-19 08:09:49', 'updateTime': '2020-10-19 08:09:49', 'id': 67, 'parentId': 66, 'name': '查询', 'router': '', 'perms': 'sys:log:task:page', 'type': 2, 'icon': '', 'orderNum': 0, 'viewPath': '', 'keepalive': true, 'isShow': true }, { 'createTime': '2020-09-02 08:22:27', 'updateTime': '2020-09-02 08:22:27', 'id': 10, 'parentId': 7, 'name': '查询', 'router': null, 'perms': 'sys:menu:list,sys:menu:info', 'type': 2, 'icon': null, 'orderNum': 0, 'viewPath': null, 'keepalive': true, 'isShow': true }, { 'createTime': '2020-09-11 06:12:14', 'updateTime': '2020-09-11 06:12:14', 'id': 39, 'parentId': 4, 'name': '部门新增', 'router': '', 'perms': 'sys:dept:add', 'type': 2, 'icon': '', 'orderNum': 0, 'viewPath': '', 'keepalive': true, 'isShow': true }, { 'createTime': '2020-08-01 00:00:00', 'updateTime': '2020-09-14 03:53:31', 'id': 3, 'parentId': 1, 'name': '权限管理', 'router': '/sys/permssion', 'perms': null, 'type': 0, 'icon': 'permission', 'orderNum': 0, 'viewPath': '', 'keepalive': true, 'isShow': true }, { 'createTime': '2020-09-07 07:08:18', 'updateTime': '2020-09-14 10:26:58', 'id': 28, 'parentId': 23, 'name': '新增', 'router': '', 'perms': 'sys:role:add', 'type': 2, 'icon': '', 'orderNum': 0, 'viewPath': '', 'keepalive': true, 'isShow': true }, { 'createTime': '2020-10-13 09:52:08', 'updateTime': '2020-10-13 09:53:44', 'id': 55, 'parentId': 37, 'name': '登录日志', 'router': '/sys/monitor/login-log', 'perms': null, 'type': 1, 'icon': 'guide', 'orderNum': 0, 'viewPath': 'views/system/monitor/login-log', 'keepalive': true, 'isShow': true }, { 'createTime': '2020-10-12 10:00:49', 'updateTime': '2020-10-12 10:00:49', 'id': 51, 'parentId': 37, 'name': '在线用户', 'router': '/sys/monitor/online', 'perms': null, 'type': 1, 'icon': 'people', 'orderNum': 0, 'viewPath': 'views/system/monitor/online', 'keepalive': true, 'isShow': true }, { 'createTime': '2020-10-19 05:46:01', 'updateTime': '2020-10-19 05:46:01', 'id': 63, 'parentId': 58, 'name': '运行', 'router': '', 'perms': 'sys:task:start', 'type': 2, 'icon': '', 'orderNum': 0, 'viewPath': '', 'keepalive': true, 'isShow': true }, { 'createTime': '2020-09-07 10:39:50', 'updateTime': '2020-09-09 06:34:13', 'id': 32, 'parentId': 23, 'name': '查询', 'router': '', 'perms': 'sys:role:list,sys:role:page,sys:role:info', 'type': 2, 'icon': '', 'orderNum': 0, 'viewPath': '', 'keepalive': true, 'isShow': true }, { 'createTime': '2020-09-11 06:29:52', 'updateTime': '2020-09-11 06:29:52', 'id': 41, 'parentId': 4, 'name': '部门更新', 'router': '', 'perms': 'sys:dept:update', 'type': 2, 'icon': '', 'orderNum': 0, 'viewPath': '', 'keepalive': true, 'isShow': true }, { 'createTime': '2020-08-08 00:00:00', 'updateTime': '2020-09-08 06:54:45', 'id': 4, 'parentId': 3, 'name': '用户列表', 'router': '/sys/permssion/user', 'perms': null, 'type': 1, 'icon': 'peoples', 'orderNum': 0, 'viewPath': 'views/system/permission/user', 'keepalive': true, 'isShow': true }, { 'createTime': '2020-10-13 03:01:51', 'updateTime': '2020-10-13 03:01:51', 'id': 53, 'parentId': 51, 'name': '下线', 'router': '', 'perms': 'sys:online:kick', 'type': 2, 'icon': '', 'orderNum': 0, 'viewPath': '', 'keepalive': true, 'isShow': true }, { 'createTime': '2020-10-13 09:56:13', 'updateTime': '2020-10-13 09:56:13', 'id': 56, 'parentId': 55, 'name': '查询', 'router': '', 'perms': 'sys:log:login:page', 'type': 2, 'icon': '', 'orderNum': 0, 'viewPath': '', 'keepalive': true, 'isShow': true }, { 'createTime': '2020-08-15 00:00:00', 'updateTime': '2020-09-11 06:11:52', 'id': 5, 'parentId': 4, 'name': '新增', 'router': null, 'perms': 'sys:user:add', 'type': 2, 'icon': null, 'orderNum': 0, 'viewPath': null, 'keepalive': true, 'isShow': true }, { 'createTime': '2020-10-19 03:07:18', 'updateTime': '2020-10-19 07:26:37', 'id': 57, 'parentId': 1, 'name': '任务调度', 'router': '/sys/schedule', 'perms': null, 'type': 0, 'icon': 'task', 'orderNum': 0, 'viewPath': '', 'keepalive': true, 'isShow': true }, { 'createTime': '2020-10-19 05:46:23', 'updateTime': '2020-10-19 05:46:23', 'id': 64, 'parentId': 58, 'name': '暂停', 'router': '', 'perms': 'sys:task:stop', 'type': 2, 'icon': '', 'orderNum': 0, 'viewPath': '', 'keepalive': true, 'isShow': true }, { 'createTime': '2020-09-07 02:49:36', 'updateTime': '2020-09-14 03:56:56', 'id': 26, 'parentId': 44, 'name': '饿了么文档', 'router': 'http://element-cn.eleme.io/#/zh-CN/component/installation', 'perms': '', 'type': 1, 'icon': 'international', 'orderNum': 0, 'viewPath': 'views/charts/keyboard', 'keepalive': true, 'isShow': true }, { 'createTime': '2020-09-11 04:34:52', 'updateTime': '2020-10-12 08:14:58', 'id': 38, 'parentId': 37, 'name': '请求追踪', 'router': '/sys/monitor/log', 'perms': '', 'type': 1, 'icon': 'log', 'orderNum': 0, 'viewPath': 'views/system/monitor/req-log', 'keepalive': true, 'isShow': true }, { 'createTime': '2020-08-15 00:00:00', 'updateTime': '2020-08-15 00:00:00', 'id': 8, 'parentId': 7, 'name': '新增', 'router': null, 'perms': 'sys:menu:add', 'type': 2, 'icon': null, 'orderNum': 0, 'viewPath': null, 'keepalive': true, 'isShow': false }, { 'createTime': '2020-08-08 00:00:00', 'updateTime': '2020-09-24 09:51:40', 'id': 7, 'parentId': 3, 'name': '菜单列表', 'router': '/sys/permssion/menu', 'perms': null, 'type': 1, 'icon': 'menu', 'orderNum': 0, 'viewPath': 'views/system/permission/menu', 'keepalive': true, 'isShow': true }, { 'createTime': '2020-10-19 03:09:09', 'updateTime': '2020-10-19 03:09:09', 'id': 60, 'parentId': 58, 'name': '新增', 'router': '', 'perms': 'sys:task:add', 'type': 2, 'icon': '', 'orderNum': 0, 'viewPath': '', 'keepalive': true, 'isShow': true }, { 'createTime': '2020-10-19 03:08:36', 'updateTime': '2020-10-19 03:08:36', 'id': 59, 'parentId': 58, 'name': '查询', 'router': '', 'perms': 'sys:task:page,sys:task:info', 'type': 2, 'icon': '', 'orderNum': 0, 'viewPath': '', 'keepalive': true, 'isShow': true }, { 'createTime': '2020-09-08 05:29:40', 'updateTime': '2020-09-11 06:03:43', 'id': 33, 'parentId': 4, 'name': '部门查询', 'router': '', 'perms': 'sys:dept:list,sys:dept:info', 'type': 2, 'icon': '', 'orderNum': 0, 'viewPath': '', 'keepalive': true, 'isShow': true }, { 'createTime': '2020-10-19 03:08:15', 'updateTime': '2020-10-19 07:21:04', 'id': 58, 'parentId': 57, 'name': '定时任务', 'router': '/sys/schedule/task', 'perms': null, 'type': 1, 'icon': 'schedule', 'orderNum': 0, 'viewPath': 'views/system/schedule/task', 'keepalive': true, 'isShow': true }, { 'createTime': '2020-10-19 06:25:52', 'updateTime': '2020-10-19 06:25:52', 'id': 65, 'parentId': 58, 'name': '删除', 'router': '', 'perms': 'sys:task:delete', 'type': 2, 'icon': '', 'orderNum': 0, 'viewPath': '', 'keepalive': true, 'isShow': true }, { 'createTime': '2020-10-13 09:37:29', 'updateTime': '2020-10-13 09:37:29', 'id': 54, 'parentId': 38, 'name': '查询', 'router': '', 'perms': 'sys:log:req:page,sys:log:req:search', 'type': 2, 'icon': '', 'orderNum': 0, 'viewPath': '', 'keepalive': true, 'isShow': true }, { 'createTime': '2020-08-15 00:00:00', 'updateTime': '2020-08-15 00:00:00', 'id': 9, 'parentId': 7, 'name': '删除', 'router': null, 'perms': 'sys:menu:delete', 'type': 2, 'icon': null, 'orderNum': 0, 'viewPath': null, 'keepalive': true, 'isShow': true }], 'perms': ['sys:dept:list', 'sys:dept:info', 'sys:user:page', 'sys:user:info', 'sys:menu:list', 'sys:menu:info', 'sys:role:list', 'sys:role:page', 'sys:role:info', 'sys:log:req:page', 'sys:log:req:search', 'sys:online:list', 'sys:log:login:page', 'sys:task:page', 'sys:task:info', 'sys:log:task:page', 'netdisk:manage:list', 'netdisk:manage:info', 'netdisk:manage:mkdir', 'netdisk:manage:token', 'sys:user:add', 'sys:dept:move', 'sys:dept:transfer', 'sys:dept:add', 'sys:dept:update', 'sys:menu:add', 'sys:menu:delete', 'sys:menu:update', 'sys:role:add', 'sys:online:kick', 'sys:task:add', 'sys:task:update', 'sys:task:once', 'sys:task:start', 'sys:task:stop', 'sys:task:delete', 'sys:dept:delete', 'netdisk:manage:download', 'netdisk:manage:mark'] }
        const info = results[1].data
        const { perms } = pm
        let { menus } = pm
        menus = menus.map((item) => {
          return {
            id: item.id,
            parentId: item.parent_id,
            name: item.name,
            router: item.router,
            perms: item.perms,
            type: item.type,
            icon: item.icon,
            orderNum: item.order_num,
            viewPath: item.view_path,
            keepalive: item.keepalive,
            isShow: item.is_show
          }
        })

        console.log(menus)

        // set store
        commit('SET_PERMS', perms)
        commit('SET_NAME', info.name)
        commit('SET_AVATAR', info.headImg)

        resolve({ menus, perms, user: info })
      }).catch(error => {
        reject(error)
      })
    })
  },

  // 管理员退出
  logout({ commit, dispatch }) {
    return new Promise((resolve, reject) => {
      logout()
        .then(() => {
          // 清除localstorage存储的token
          removeToken()

          // 清除store存储的routes
          dispatch('permission/resetRoutes', null, { root: true })

          // reset visited views and cached views
          // to fixed https://github.com/PanJiaChen/vue-element-admin/issues/2485
          dispatch('tagsView/delAllViews', null, { root: true })

          // clean vue-router
          resetRouter()
          commit('RESET_STATE')
          resolve()
        })
        .catch(error => {
          reject(error)
        })
    })
  },

  // 清除token
  resetToken({ commit }) {
    return new Promise(resolve => {
      // 清除localstorage存储的token
      removeToken()

      // reset state
      commit('RESET_STATE')
      resolve()
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
