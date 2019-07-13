import Vue from 'vue'
import lazy from '../../../lib/vclazygrader'
import _ from 'lodash'

export default {
  namespaced: true,
  state: {
    collection: [],
    course_infos: [],
    loaded: false
  },

  getters: {
    find: (state, getters) => (id) => {
      if (typeof (id) === 'string') id = parseInt(id)
      return _.find(state.collection, ['id', id])
    },

    collection: state => {
      return state.collection
    },

    loaded: state => {
      return state.loaded
    }
  },

  mutations: {
    collection: function (state, data) {
      state.collection = data
      state.loaded = true
    },

    course_infos: function (state, data) {
      state.course_infos = data
    },

    loaded: function (state, data) {
      state.loaded = data
    }
  },

  actions: {
    fetch: function (context, data) {
      context.commit('loaded', false)
      return Vue.axios.get(lazy.url('courses'))
        .then(response => {
          context.commit('collection', response.data)
          context.commit('loaded', true)
          return Promise.resolve(response)
        })
    },

    fetch_courses_for: function (context, data) {
      return Vue.axios.get(lazy.url(`courses/for/${data}`))
        .then(response => {
          return Promise.resolve(response)
        })
        .catch(error => {
          return Promise.reject(error)
        })
    },

    fetch_course_infos: function (context, data) {
      return Vue.axios.get(lazy.url('/course_infos'))
        .then(response => {
          context.commit('course_infos', response.data)
          return Promise.resolve(response)
        })
        .catch(error => {
          return Promise.reject(error)
        })
    }
  }
}
