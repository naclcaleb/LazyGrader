import Vue from 'vue'
import lazy from '../../../lib/vclazygrader'

export default {
  namespaced: true,
  state: {
    settings: null,
    loaded: false
  },

  getters: {
    settings: state => {
      return state.settings
    },

    title: state => {
      return state.settings.title
    },

    college_name: state => {
      return state.settings.college_name
    },

    canvas_url: state => {
      return state.settings.canvas_url
    },

    jenkins_url: state => {
      return state.settings.jenkins_url
    },

    loaded: state => {
      return state.loaded
    }
  },

  mutations: {
    settings: function (state, data) {
      state.settings = data
      state.loaded = true
    },

    title: function (state, title) {
      state.settings.title = title
      document.title = title
    },

    loaded: function (state, data) {
      state.loaded = data
    }
  },

  actions: {
    fetch: function (context, data) {
      context.commit('loaded', false)
      return Vue.axios.get(lazy.url('settings'))
        .then(response => {
          context.commit('settings', response.data[0])
          return Promise.resolve(response)
        })
    },

    upload: function (context, data) {
      console.log('data: ', data)
      return Vue.axios.post(lazy.url('settings/upload'), data)
        .then(response => {
          return Promise.resolve(response)
        })
    }
  }
}
