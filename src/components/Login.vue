<template>
  <div id="login">
    <h1>Log In</h1>
    <div v-if="authenticated">
      <router-link :to="{name: 'home'}">Home</router-link>
    </div>
    <div v-else>
    <form @submit.prevent="handleSubmit">
    <table>
      <tr>
        <td>
          <label for="uname"><b>Username</b></label>
          <br>
          <input type="text" id="uname" placeholder="Enter Username" v-model="sign_in.email" required>
        </td>
      </tr>
      <tr>
        <td>
          <label for="psw"><b>Password</b></label>
          <br>
          <input type="password" id="psw" placeholder="Enter Password" v-model="sign_in.password" required>
        </td>
      </tr>
      <tr>
        <td>
          <button type="submit" id="loginBtn">Login</button>
        </td>
      </tr>
      <tr>
        <td>
          <label>
            <input type="checkbox" checked="checked" id="remember"> Remember me
          </label>
        </td>
      </tr>
    </table>
    </form>
    <div id="error" v-if="failed">
      <p>Invalid email or password. Please try again</p>
    </div>
    </div>
  </div>
</template>

<script>
import {mapState, mapActions} from 'vuex'
import AuthenticatedDiv from './components/AuthenticatedDiv'

export default {
  name: 'Login',
  components: {AuthenticatedDiv},
  data () {
    return {
      sign_in: {
        email: '',
        password: ''
      },
      failed: false
    }
  },
  computed: {
    ...mapState({
      current_user: state => state.user.user,
      authenticated: state => state.user.authenticated
    })
  },
  methods: {
    ...mapActions({
      signIn: 'user/sign_in'
    }),
    handleSubmit: function () {
      this.signIn(this.sign_in)
        .then(response => {
          console.log('Sign in: ', this.current_user)
          this.$notify({
            group: 'auth',
            title: 'Logged In',
            text: 'Signed in as ' + this.current_user.email
          })
          this.$router.push({
            name: 'courses'
          })
        })
        .catch(error => {
          console.log('Authentication failed: ', error)
          this.failed = true
          this.$notify({
            group: 'auth',
            title: 'Error',
            text: 'Invalid email or password',
            type: 'warn'
          })
        })
    }
  },
  mounted () {
    console.log('Role: ', this.user)
  }
}
</script>

<style scoped>
  #login, #login #uname, #login #psw, #login #loginBtn, #login #remember{
    margin-bottom: 5px;
  }
  #login #uname, #login #psw{
    padding: 5px;
  }
  #login table{
    text-align: left;
    margin:auto;
  }
  #error{
    border: 3px solid #c40303;
    text-align: center;
    vertical-align: middle;
    width: 350px;
    height: 40px;
    margin: auto;
    color: #9c0303;
    background-color: #d47474;
  }
</style>
