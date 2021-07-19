import { constantRoutes, NotFoundRouter } from '@/router'
import { filterAsyncRoutes } from '@/router/generator-routers'

const state = {
  routes: [], // 当前用户的所有路由
  addedRoutes: [] // 添加的路由（未使用到）
}

const mutations = {
  SET_ROUTES: (state, routes) => {
    state.addedRoutes = routes
    state.routes = constantRoutes.concat(routes)
  }
}

const actions = {
  generateRoutes({ commit }, menus) {
    return new Promise(resolve => {
      // 后端路由json进行转换成真正的router map
      const accessRoutes = filterAsyncRoutes(menus, null)
      // 404 route must be end
      accessRoutes.push(NotFoundRouter)
      commit('SET_ROUTES', accessRoutes)
      resolve(accessRoutes)
    })
  },
  resetRoutes({ commit }) {
    return new Promise(resolve => {
      commit('SET_ROUTES', [])
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
