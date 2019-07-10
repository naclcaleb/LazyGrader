<template>
  <div id="app">
   <VCHeader></VCHeader>
      <notifications group="build"/>
      <notifications group="grade"/>
      <notifications group="copy"/>
      <notifications group="settings"/>
      <notifications group="edit"/>
    <router-view/>
    <VCFooter></VCFooter>
  </div>
</template>

<script>
import store from './store'
import VCFooter from './components/Footer'
import VCHeader from './components/Header'
import {mapActions, mapGetters} from 'vuex'

export default {
  name: 'App',
  components: {VCHeader, VCFooter},
  methods: {
    ...mapActions({
      fetch: 'settings/fetch'
    })
  },
  computed: {
    ...mapGetters({
      title: 'settings/title'
    })
  },
  created () {
    this.$store.initializeModules()
    this.fetch().then(response => {
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
