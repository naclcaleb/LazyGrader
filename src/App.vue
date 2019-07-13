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
    this.$store.initializeModules()
    if (localStorage.getItem('user') !== null) {
      this.token(localStorage.getItem('token'))
      this.client(localStorage.getItem('client'))
      this.uid(localStorage.getItem('uid'))
      this.user(JSON.parse(localStorage.getItem(('user'))))
      this.authenticated(true)
    }
    this.fetch_courses().then(response => {
      console.log(this.title)
      document.title = this.title
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
