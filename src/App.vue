<template>
  <div id="app">
   <VCHeader></VCHeader>
      <notifications group="build"/>
      <notifications group="grade"/>
      <notifications group="copy"/>
      <notifications group="settings"/>
      <notifications group="edit"/>
      <notifications group="auth"/>
    <router-view/>
    <VCFooter></VCFooter>
  </div>
</template>

<script>
import store from './store'
import VCFooter from './components/Footer'
import VCHeader from './components/Header'
import {mapState, mapActions, mapMutations} from 'vuex'
import Vue from 'vue'

export default {
  name: 'App',
  components: {VCHeader, VCFooter},
  methods: {
    ...mapActions({
      fetch_courses: 'settings/fetch'
    }),
    ...mapMutations({
      token: 'user/token',
      client: 'user/client',
      uid: 'user/uid',
      user: 'user/user',
      authenticated: 'user/authenticated'
    })
  },
  computed: {
    ...mapState({
      title: state => state.settings.settings.title
    })
  },
  created () {
    if (localStorage.getItem('user') !== null) {
      this.user(JSON.parse(localStorage.getItem(('user'))))
      this.authenticated(true)
    }
    if (localStorage.getItem('token') && localStorage.getItem('client') && localStorage.getItem(('uid'))) {
      this.token(localStorage.getItem('token'))
      this.client(localStorage.getItem('client'))
      this.uid(localStorage.getItem('uid'))
      Vue.axios.defaults.headers.common['access-token'] = localStorage.getItem('token')
      Vue.axios.defaults.headers.common['client'] = localStorage.getItem('client')
      Vue.axios.defaults.headers.common['uid'] = localStorage.getItem('uid')
    } else {
      delete Vue.axios.defaults.headers.common['access-token']
      delete Vue.axios.defaults.headers.common['client']
      delete Vue.axios.defaults.headers.common['uid']
    }
    if (localStorage.getItem('title') !== null) {
      document.title = localStorage.getItem('title')
    }
    this.fetch_courses().then(response => {
      document.title = this.title
      localStorage.setItem('title', this.title)
    })
  },
  store
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #030000;
  margin-top: 60px;
  padding-bottom: 30px;
}
</style>
