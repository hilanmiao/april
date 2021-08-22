import { login, logout } from '@/api/login'
import { getBasic } from '@/api/system/user'
import { setToken, removeToken } from '@/utils/auth'
import { resetRouter } from '@/router'
import { getMyPowerMenus, getMyPowerOperations } from '@/api/system/power'

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
          const { data } = response
          const powerMenus = data
          // const powerMenus = [{"id":"0a23246d-81f8-4ac7-91e4-6a9bf1a485f3","parent_id":"2e6f67b1-8b5f-4e41-b042-ecf698123648","name":"权限管理","router":"/system/power","type":"directory","icon":"documentation","order_num":0,"view_path":null,"keepalive":false,"is_hidden":false,"created_at":"2021-07-22 15:18:23","updated_at":"2021-07-22 15:18:23","deleted_at":null},{"id":"2330595e-d765-47f9-a2a5-cce9c626a502","parent_id":"0a23246d-81f8-4ac7-91e4-6a9bf1a485f3","name":"菜单管理","router":"/system/power/menu","type":"menu","icon":"documentation","order_num":0,"view_path":"views/system/power/menu","keepalive":false,"is_hidden":false,"created_at":"2021-07-22 15:18:53","updated_at":"2021-07-22 15:18:53","deleted_at":null},{"id":"2e6f67b1-8b5f-4e41-b042-ecf698123648","parent_id":null,"name":"系统管理","router":"/system","type":"directory","icon":"dashboard","order_num":0,"view_path":null,"keepalive":false,"is_hidden":false,"created_at":"2021-07-22 15:07:35","updated_at":"2021-07-22 15:07:35","deleted_at":null},{"id":"3c6b46cc-be72-4d1b-9ec2-fd3bca050efd","parent_id":"2e6f67b1-8b5f-4e41-b042-ecf698123648","name":"角色管理","router":"/system/role","type":"menu","icon":"chart","order_num":0,"view_path":"views/system/role","keepalive":false,"is_hidden":false,"created_at":"2021-07-22 15:12:10","updated_at":"2021-07-22 15:12:10","deleted_at":null},{"id":"70edbb32-9836-4a74-8926-75f251c06f9c","parent_id":"2e6f67b1-8b5f-4e41-b042-ecf698123648","name":"用户管理","router":"/system/user","type":"menu","icon":"documentation","order_num":0,"view_path":"views/system/user","keepalive":false,"is_hidden":false,"created_at":"2021-07-22 15:17:59","updated_at":"2021-07-22 15:17:59","deleted_at":null}]
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
          const powerOperations = ['system:dept:list', 'system:dept:info', 'system:user:page', 'system:user:info', 'system:menu:list', 'system:menu:info', 'system:role:list', 'system:role:page', 'system:role:info', 'system:user:add', 'system:dept:move', 'system:dept:transfer', 'system:dept:add', 'system:dept:update', 'system:menu:add', 'system:menu:delete', 'system:menu:update', 'system:role:add', 'system:dept:delete']
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
          dispatch('router/resetRoutes', null, { root: true })

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
