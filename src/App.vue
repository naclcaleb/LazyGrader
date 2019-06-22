<template>
  <div id="app">
   <VCHeader></VCHeader>
      <notifications group="build"/>
      <notifications group="grade"/>
      <notifications group="copy"/>
      <notifications group="settings"/>
    <router-view/>
    <VCFooter></VCFooter>
  </div>
</template>

<script>
import store from './store'
import VCFooter from './components/Footer'
import VCHeader from './components/Header'

export default {
  name: 'App',
  components: {VCHeader, VCFooter},
  created () {
    this.$store.initializeModules()
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
