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

    update: function (state, data) {
      state.collection = _.union(state.collection, data)
    },

    loaded: function (state, data) {
      state.loaded = data
    },

    reset: function (state) {
      _.assign(state.collection, defaultValues())
    }
  },

  actions: {
    fetch: function (context, data) {
      context.commit('loaded', false)
      return Vue.axios.get(lazy.url('/assignments'))
        .then(response => {
          context.commit('collection', response.data)
          return Promise.resolve(response)
        })
    },

    upload: function (context, data) {
      return Vue.axios.put(lazy.url(`assignments/${data.id}`), data)
        .then(response => {
          return Promise.resolve(response)
        })
    },

    bulk: function (context, data) {
      return Vue.axios.post(lazy.url('assignments/upload'), data)
        .then(response => {
          context.commit('update', response.data)
          return Promise.resolve(response)
        })
    },

    get_assignments_for_course: function (context, courseId) {
      return Vue.axios.get(lazy.url(`/assignments/for/${courseId}`))
        .then(response => {
          return Promise.resolve(response)
        })
        .catch(error => {
          return Promise.reject(error)
        })
    }
  }
}
