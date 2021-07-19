import Vue from 'vue'

import 'normalize.css/normalize.css' // a modern alternative to CSS resets

import './styles/element-variables.scss'

import './styles/index.scss' // global css

import App from './App'
import store from './store'
import router from './router'
import bootstrap from './core/bootstrap'

import './core/use' // vue use
import './icons' // icon

Vue.config.productionTip = false

new Vue({
  el: '#app',
  router,
  store,
  // init localstorage, vuex
  created: bootstrap,
  render: h => h(App)
})
