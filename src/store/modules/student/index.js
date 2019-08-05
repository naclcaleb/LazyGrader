import Vue from 'vue'
import lazy from '../../../lib/vclazygrader'
import _ from 'lodash'

const defaultValues = () => {
  return {
    collection: [],
    loaded: false
  }
}

export default {
  namespaced: true,
  state: {
    collection: [],
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

    loaded: function (state, data) {
      state.loaded = data
    },

    update: function (state, data) {
      state.collection = _.union(state.collection, data)
    },

    reset: function (state) {
      Object.assign(state, defaultValues())
    }
  },

  actions: {
    fetch: function (context, data) {
      context.commit('loaded', false)
      return Vue.axios.get(lazy.url('students'))
        .then(response => {
          context.commit('collection', response.data)
          return Promise.resolve(response)
        })
    },

    get_assignment_status: function (context, [studentId, assignmentId]) {
      return Vue.axios.get(lazy.url(`students/${studentId}/status/${assignmentId}`))
        .then(response => {
          return Promise.resolve(response)
        })
        .catch(error => {
          return Promise.reject(error)
        })
    },

    upload: function (context, data) {
      return Vue.axios.put(lazy.url(`students/${data.id}`), data)
        .then(response => {
          return Promise.resolve(response)
        })
    },

    bulk: function (context, data) {
      return Vue.axios.post(lazy.url('students/upload'), data)
        .then(response => {
          context.commit('update', response.data.students)
          return Promise.resolve(response)
        })
    }
  }
}
