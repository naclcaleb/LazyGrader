<template>
  <ul id="navbar">
    <li class="logo"><a href="https://www.venturacollege.edu/" target="_blank"><img src="../assets/VC-logo.png" alt=""/></a></li>
    <li><router-link :to="{name: 'home'}">Home</router-link></li>
    <authenticated-item><router-link :to="{name: 'students'}">Students</router-link></authenticated-item>
    <authenticated-item><router-link :to="{name: 'assignments'}">Assignments</router-link></authenticated-item>
    <authorized-item :role="'admin'"><router-link :to="{name: 'settings'}">Settings</router-link></authorized-item>
    <li><router-link :to="{name: 'about'}">About</router-link></li>
    <div id="authLinks">
      <li v-if="!authenticated"><router-link :to="{name: 'login'}">Log In</router-link></li>
      <authenticated-item><a @click.prevent="handleSignOut">Log Out</a></authenticated-item>
    </div>
  </ul>
</template>
<script>
import {mapActions, mapState} from 'vuex'
import AuthenticatedItem from './components/AuthenticatedList'
import AuthorizedItem from './components/AuthorizedList'

export default {
  name: 'VCHeader',
  components: {AuthorizedItem, AuthenticatedItem},
  computed: {
    ...mapState({
      current_user: state => state.user.user,
      authenticated: state => state.user.authenticated
    })
  },
  methods: {
    ...mapActions({
      signOut: 'user/sign_out'
    }),

    handleSignOut: function () {
      console.log('Signing out')
      this.signOut()
        .then(response => {
          console.log('Signed out: ', response)
        })
        .catch(error => {
          console.log('Error while signing out: ', error)
        })
        .finally(() => {
          this.$router.push({name: 'home'})
        })
    }
  }
}
</script>

<style scoped>
  #navbar{
    list-style-type: none;
    margin: 0;
    padding:0;
    position: fixed;
    top:0;
    right:0;
    width:100%;
    overflow: hidden;
    background-color:#FF6C0E;
  }
  #navbar li{
    float:left;
  }
  #navbar li a{
    display: block;
    text-align: center;
    padding: 14px 16px;
    text-decoration: none;
    font-size: 18px;
    color: #030000;
    border-right: 1px solid #cecece;
  }
  #navbar li a:hover{
    background-color:#FF9015;
  }
  #navbar li.logo a img{
    height:49px;
    width:auto;
    padding:0;
    margin:0;
  }
  #navbar li.logo a{
    height:49px;
    padding:0;
    margin:0;
  }
  #authLinks li a{
    border-left: 1px solid #cecece;
    border-right: 0 !important;
  }
  #authLinks li{
    float: right !important;
  }
</style>
