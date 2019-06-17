// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import Notifications from 'vue-notification'
import moment from 'moment'
import axios from 'axios'
import VueAxios from 'vue-axios'

Vue.config.productionTip = false
Vue.use(Notifications)
Vue.use(VueAxios, axios)

Vue.filter('formatDate', function (value) {
  if (value) {
    return moment(String(value)).format('MM/DD/YYYY')
  }
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
