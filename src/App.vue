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
import VCFooter from './components/Footer'
import VCHeader from './components/Header'
import {mapState, mapActions, mapMutations} from 'vuex'

export default {
  name: 'App',
  components: {VCHeader, VCFooter},
  methods: {
    ...mapActions({
      fetch: 'settings/fetch',
      fetch_courses: 'course/fetch'
    }),
    ...mapMutations({
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
    this.fetch_courses()
    if (localStorage.getItem('title') !== null) {
      document.title = localStorage.getItem('title')
    }
    this.fetch().then(response => {
      document.title = this.title
      localStorage.setItem('title', this.title)
    })
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #030000;
  margin-top: 60px;
  padding-bottom: 30px;
}
</style>
