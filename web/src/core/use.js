import Vue from 'vue'
import ElementUI from 'element-ui'

import EventBus from '@/utils/event-bus'
import VEcharts from '@/components/Echarts'

Vue.use(EventBus)
// directives

// ui
Vue.use(ElementUI)
Vue.use(VEcharts)
