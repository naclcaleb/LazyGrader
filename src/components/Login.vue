<template>
  <div id="login">
    <h1>Log In</h1>
    <table>
      <tr>
        <td>
          <label for="uname"><b>Username</b></label>
          <br>
          <input type="text" placeholder="Enter Username" id="uname" required>
        </td>
      </tr>
      <tr>
        <td>
          <label for="psw"><b>Password</b></label>
          <br>
          <input type="password" placeholder="Enter Password" id="psw" required>
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
  </div>
</template>

<script>
export default {
  name: 'Login'
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
