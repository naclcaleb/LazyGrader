import Vue from 'vue'
import lazy from '../../../lib/vclazygrader'

export default {
  namespaced: true,
  state: {
    settings: {title: 'LazyGrader'},
    loaded: false
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
      return Vue.axios.get(lazy.url('settings'), {headers: this.getters['user/headers']})
        .then(response => {
          context.commit('settings', response.data)
          return Promise.resolve(response)
        })
    },

    upload: function (context, data) {
      return Vue.axios.post(lazy.url('settings/upload'), data, {headers: this.getters['user/headers']})
        .then(response => {
          return Promise.resolve(response)
        })
    }
  }
}
