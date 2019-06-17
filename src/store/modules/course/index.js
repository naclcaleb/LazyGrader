import Vue from 'vue'
import lazy from '../../../lib/vclazygrader'
import _ from 'lodash'

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
    }
  },

  actions: {
    fetch: function (context, data) {
      context.commit('loaded', false)
      return Vue.axios.get(lazy.url('/courses'))
        .then(response => {
          context.commit('collection', response.data)
          return Promise.resolve(response)
        })
    }
  }
}
