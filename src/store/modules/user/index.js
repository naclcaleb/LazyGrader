import Vue from 'vue'
import lazy from '../../../lib/vclazygrader'

export default {
  namespaced: true,
  state: {
    token: '',
    client: '',
    uid: '',
    user: null,
    authenticated: false
  },

  getters: {
    user: state => {
      return state.user
    },

    token: state => {
      return state.token
    },

    client: state => {
      return state.client
    },

    uid: state => {
      return state.uid
    },

    data: state => {
      return state.user
    },

    headers: state => {
      return {'access-token': state.token, client: state.client, uid: state.uid}
    },

    authenticated: state => {
      return state.authenticated
    }
  },

  mutations: {
    authenticated: function (state, auth) {
      state.authenticated = auth
    },

    token: function (state, token) {
      state.token = token
    },

    client: function (state, client) {
      state.client = client
    },

    uid: function (state, uid) {
      state.uid = uid
    },

    user: function (state, user) {
      state.user = user
    }
  },

  actions: {
    sign_in: function (context, credentials) {
      return Vue.axios.post(lazy.auth('sign_in'), credentials, {headers: {'Content-Type': 'application/json'}})
        .then(response => {
          context.commit('authenticated', true)
          context.commit('token', response.headers['access-token'])
          context.commit('client', response.headers.client)
          context.commit('uid', response.headers.uid)
          context.commit('user', response.data.data)
          return Promise.resolve(response)
        })
        .catch(error => {
          return Promise.reject(error)
        })
    },

    sign_out: function (context) {
      return Vue.axios.delete(lazy.auth('sign_in'), {headers: {
        'access-token': context.token,
        'client': context.client,
        'uid': context.uid
      }})
        .then(response => {
          context.commit('authenticated', false)
          return Promise.resolve(response)
        })
        .catch(error => {
          return Promise.reject(error)
        })
    }
  }
}
