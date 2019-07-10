<template>
  <div id="login">
    <h1>Log In</h1>
    <form @submit.prevent="handleSubmit">
    <table>
      <tr>
        <td>
          <label for="uname"><b>Username</b></label>
          <br>
          <input type="text" placeholder="Enter Username" v-model="sign_in.email" required>
        </td>
      </tr>
      <tr>
        <td>
          <label for="psw"><b>Password</b></label>
          <br>
          <input type="password" placeholder="Enter Password" v-model="sign_in.password" required>
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
  </div>
</template>

<script>
import {mapGetters, mapActions} from 'vuex'

export default {
  name: 'Login',
  data () {
    return {
      sign_in: {
        email: '',
        password: ''
      }
    }
  },
  computed: {
    ...mapGetters({
      authenticate: 'user/authenticated',
      user: 'user/user'
    })
  },
  methods: {
    ...mapActions({
      signIn: 'user/sign_in'
    }),
    handleSubmit: function () {
      this.signIn(this.sign_in)
        .then(response => {
          console.log('Sign in: ', response)
        })
        .catch(error => {
          console.log('Authentication failed: ', error)
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
</style>
