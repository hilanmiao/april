import { getAccessToken } from '@/utils/auth'

const SocketStatus = {
  // 连接中
  CONNECTING: 'CONNECTING',
  // 已连接
  CONNECTED: 'CONNECTED',
  // 已关闭
  CLOSE: 'CLOSE'
}
// const staticEvents = [
//   // socket instance listen
//   'connect',
//   'connect_error',
//   'disconnect',
//   'disconnecting',
//   'newListener',
//   'removeListener',
//   // Manager listen
//   'error',
//   'reconnect',
//   'reconnect_attempt',
//   'reconnect_error',
//   'reconnect_failed',
//   'ping',
//   'pong'
// ]

const state = {
  status: SocketStatus.CLOSE,
  onlineUserSocketIds: [] // 所有在线用户socketIds
}

const mutations = {
  SOCKET_ONLINE: (state, socketMessage) => {
    console.log(socketMessage)
    state.onlineUserSocketIds = socketMessage.clients
  }
}

const actions = {
  // vue-socket.io-extended 插件 mutation、action 命名有区别，而且自动 dispatched or committed
  socket_online() {
    console.log('this action will be called')
  },
  initSocket({ commit, state }, data) {
    this._vm.$socket.client.io.opts.query = { username: data.username, accessToken: getAccessToken() }
    this._vm.$socket.client.open()
    console.debug('socket 连接')
  },
  closeSocket({ commit, state }) {
    this._vm.$socket.client.close()
    console.debug('socket 断开')
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
