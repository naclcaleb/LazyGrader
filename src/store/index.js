import Vue from 'vue'
import Vuex from 'vuex'
import _ from 'lodash'
import course from './modules/course'
import assignment from './modules/assignment'
import student from './modules/student'
import setting from './modules/settings'
Vue.use(Vuex)

export default _.merge(new Vuex.Store({
  strict: process.env.NODE_ENV !== 'production'
}), {
  initializeModules () {
    this.registerModule('course', course)
    this.registerModule('assignment', assignment)
    this.registerModule('student', student)
    this.registerModule('setting', setting)
  },

  resetModules () {
    this.unregisterModule('course')
    this.unregisterModule('assignment')
    this.unregisterModule('student')
    this.unregisterModule('setting')
  }
})
