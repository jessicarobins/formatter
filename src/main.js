// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'

import VueMaterial from 'vue-material'
import VueClipboards from 'vue2-clipboards'
import VueAnalytics from 'vue-analytics'

require('vue-material/dist/vue-material.css')
require('bootstrap/dist/css/bootstrap.css')

Vue.use(VueMaterial)
Vue.use(VueClipboards)

if (process.env.NODE_ENV === 'production') {
  const id = 'UA-91800156-1'
  Vue.use(VueAnalytics, { id })
}

Vue.material.registerTheme('default', {
  primary: 'pink',
  accent: 'amber',
  warn: 'red',
  background: 'white'
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  template: '<App/>',
  components: { App }
})
