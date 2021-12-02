import Vue from 'vue'
import ElementUI from 'element-ui'

import EventBus from '@/utils/event-bus'
import VEcharts from '@/components/Echarts'

import VueSocketIOExt from 'vue-socket.io-extended'
import { io } from 'socket.io-client'
const socket = io(process.env.VUE_APP_BASE_SOCKET)

Vue.use(EventBus)
// directives

// ui
Vue.use(ElementUI)
Vue.use(VEcharts)

// socket
Vue.use(VueSocketIOExt, socket)

