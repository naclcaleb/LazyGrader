// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import Notifications from 'vue-notification'
import moment from 'moment'
import axios from 'axios'
import VueAxios from 'vue-axios'
import store from './store'
import router from './router'

Vue.config.productionTip = false
Vue.use(Notifications)
Vue.use(VueAxios, axios)

Vue.filter('formatDate', function (value) {
  if (value) {
    return moment(String(value)).format('MM/DD/YYYY')
  }
})

store.initializeModules()

if (localStorage.getItem('user') !== null) {
  store.commit('user/user', JSON.parse(localStorage.getItem(('user'))))
  store.commit('user/authenticated', true)
}
if (localStorage.getItem('token') && localStorage.getItem('client') && localStorage.getItem(('uid'))) {
  Vue.axios.defaults.headers.common['access-token'] = localStorage.getItem('token')
  Vue.axios.defaults.headers.common['client'] = localStorage.getItem('client')
  Vue.axios.defaults.headers.common['uid'] = localStorage.getItem('uid')
  store.commit('user/token', localStorage.getItem('token'))
  store.commit('user/client', localStorage.getItem('client'))
  store.commit('user/uid', localStorage.getItem('uid'))
} else {
  delete Vue.axios.defaults.headers.common['access-token']
  delete Vue.axios.defaults.headers.common['client']
  delete Vue.axios.defaults.headers.common['uid']
}

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
