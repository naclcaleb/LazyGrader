<template>
  <div id="signup">
    <h1>Sign Up</h1>
    <table>
      <tr>
        <td>
          <label for="email"><b>Email</b></label>
          <br>
          <input type="email" placeholder="Email" id="email" required>
        </td>
      </tr>
      <tr>
        <td>
          <label for="uname"><b>Username</b></label>
          <br>
          <input type="text" placeholder="Username" id="uname" required>
        </td>
      </tr>
      <tr>
        <td>
          <label for="psw"><b>Password</b></label>
          <br>
          <input type="password" placeholder="Password" id="psw" v-on:change="checkPassword()" required>
        </td>
      </tr>
      <tr>
        <td>
          <p id="pswCheck"></p>
        </td>
      </tr>
      <tr>
        <td>
          <label for="psw2"><b>Enter Password Again</b></label>
          <br>
          <input type="password" placeholder="Password" id="psw2" required>
        </td>
      </tr>
      <tr>
        <td>
          <button type="submit" id="signupBtn">Sign Up</button>
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
  </div>
</template>

<script>
import lazy from '../lib/vclazygrader'

export default {
  name: 'Signup',
  methods: {
    checkPassword: function () {
      const psw = document.getElementById('newPsw').value
      const view = document.getElementById('pswCheck')
      lazy.check_password(psw, view)
    }
  }
}
</script>

<style scoped>
  #signup, #signup #email, #signup #uname, #signup #psw, #signup #signupBtn, #signup #remember{
    margin-bottom: 5px;
  }
  #signup #email, #signup #uname, #signup #psw, #signup #psw2{
    padding: 5px;
  }
  #signup table{
    text-align: left;
    margin:auto;
  }
</style>
