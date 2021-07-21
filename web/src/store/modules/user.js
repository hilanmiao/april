import { login, logout } from '@/api/login'
import { getBasic } from '@/api/sys/sys-user'
import { setToken, removeToken } from '@/utils/auth'
import { resetRouter } from '@/router'
import { getMyPowerMenus, getMyPowerOperations } from '@/api/sys/sys-power'

const state = {
  token: '',
  name: '',
  avatar: '',
  powerMenus: [], // 菜单权限（未使用，同 store 中的 addedRoutes）
  powerOperations: [] // 操作权限
}

const mutations = {
  RESET_STATE: state => {
    state.token = ''
    state.name = ''
    state.avatar = ''
    state.powerMenus = []
    state.powerOperations = []
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
  SET_POWER_MENUS: (state, powerMenus) => {
    state.powerMenus = powerMenus
  },
  SET_POWER_OPERATIONS: (state, powerOperations) => {
    state.powerOperations = powerOperations
  }
}

const actions = {
  // 登录
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

  // 获取我的信息
  getBasic({ commit, dispatch }) {
    return new Promise((resolve, reject) => {
      getBasic()
        .then(response => {
          const { data } = response

          commit('SET_NAME', data.display_name)
          commit('SET_AVATAR', data.avatar)

          resolve()
        })
        .catch(error => {
          reject(error)
        })
    })
  },

  // 获取我的菜单权限
  getMyPowerMenus({ commit, dispatch }) {
    return new Promise((resolve, reject) => {
      getMyPowerMenus()
        .then(response => {
          // const { data } = response
          // const { powerMenus, powerOperations } = data
          const powerMenus = [
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
          commit('SET_POWER_MENUS', powerMenus)

          resolve({ powerMenus })
        })
        .catch(error => {
          reject(error)
        })
    })
  },

  // 获取我的操作权限
  getMyPowerOperations({ commit, dispatch }) {
    return new Promise((resolve, reject) => {
      getMyPowerOperations()
        .then(response => {
          // const { data } = response
          // const { powerMenus, powerOperations } = data
          const powerOperations = ['sys:dept:list', 'sys:dept:info', 'sys:user:page', 'sys:user:info', 'sys:menu:list', 'sys:menu:info', 'sys:role:list', 'sys:role:page', 'sys:role:info', 'sys:user:add', 'sys:dept:move', 'sys:dept:transfer', 'sys:dept:add', 'sys:dept:update', 'sys:menu:add', 'sys:menu:delete', 'sys:menu:update', 'sys:role:add', 'sys:dept:delete']
          commit('SET_POWER_OPERATIONS', powerOperations)

          resolve()
        })
        .catch(error => {
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
