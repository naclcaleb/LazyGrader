import Vue from 'vue'
import lazy from '../../../lib/vclazygrader'

const defaultValues = () => {
  return {
    token: '',
    client: '',
    uid: '',
    user: null,
    authenticated: false
  }
}

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
    },

    reset: function (state) {
      Object.assign(state, defaultValues())
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
          Vue.axios.defaults.headers.common['access-token'] = response.headers['access-token']
          Vue.axios.defaults.headers.common['client'] = response.headers.client
          Vue.axios.defaults.headers.common['uid'] = response.headers.uid
          localStorage.setItem('user', JSON.stringify(response.data.data))
          localStorage.setItem('token', response.headers['access-token'])
          localStorage.setItem('uid', response.headers.uid)
          localStorage.setItem('client', response.headers.client)
          return Promise.resolve(response)
        })
        .catch(error => {
          return Promise.reject(error)
        })
    },

    sign_out: function ({commit, state}) {
      return Vue.axios.delete(lazy.auth('sign_out'), {headers: {
        'access-token': state.token,
        'client': state.client,
        'uid': state.uid
      }})
        .then(response => {
          return Promise.resolve(response)
        })
        .catch(error => {
          return Promise.reject(error)
        })
        .finally(() => {
          localStorage.removeItem('user')
          localStorage.removeItem('token')
          localStorage.removeItem('uid')
          localStorage.removeItem('client')
          delete Vue.axios.defaults.headers.common['access-token']
          delete Vue.axios.defaults.headers.common['client']
          delete Vue.axios.defaults.headers.common['uid']
          this.commit('student/reset')
          this.commit('course/reset')
          this.commit('assignment/reset')
          commit('reset')
        })
    }
  }
}
