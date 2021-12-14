const state = {
  unreadNotifications: 0
}

const mutations = {
  SET_UNREAD_NOTIFICATION: (state, count) => {
    state.unreadNotifications = count
  }
}

const actions = {
  setUnreadNotification({ commit }, data) {
    commit('SET_UNREAD_NOTIFICATION', data)
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}

