<template>
  <div class="edit">
    <h1 class="header">Edit Password</h1>
    <table>
      <tr>
        <td>
          <label for="oldPsw"><b>Old Password:</b></label>
          <br>
          <input type="password" id="oldPsw" placeholder="Old Password" required>
        </td>
      </tr>
      <tr>
        <td>
          <label for="newPsw"><b>New Password:</b></label>
          <br>
          <input type="password" id="newPsw" placeholder="New Password" v-on:change="checkPassword()" required>
        </td>
      </tr>
      <tr>
        <td>
          <p id="pswCheck"></p>
        </td>
      </tr>
      <tr>
        <td>
          <label for="newPswConf"><b>Confirm Password:</b></label>
          <br>
          <input type="password" id="newPswConf" placeholder="New Password" required>
        </td>
      </tr>
      <tr>
        <td class="buttons">
          <input type="submit" id="submit" v-on:click="handleSubmit">
          <input type="reset" id="cancel" v-on:click="cancelSubmit" value="Cancel">
        </td>
      </tr>
    </table>
  </div>
</template>

<script>
import {mapGetters} from 'vuex'
import lazy from '../../lib/vclazygrader'
export default {
  name: 'ChangePassword',
  data () {
    return {
      local_student: null
    }
  },
  computed: {
    ...mapGetters({
      findStudent: 'student/find'
    })
  },
  mounted () {
    this.local_student = this.findStudent(this.$route.params.id)
  },
  methods: {
    handleSubmit: function () {
      const oldPsw = document.getElementById('oldPsw').value
      const newPsw = document.getElementById('newPsw').value
      const newPswConf = document.getElementById('newPswConf').value
      if (this.checkValid(oldPsw, newPsw, newPswConf)) {
        console.log('Old Password: ' + oldPsw + '\nNewPassword: ' + newPsw)
        this.$notify({
          group: 'edit',
          title: 'Password Changed',
          text: 'Changes saved'
        })
        this.$router.push({name: 'student', params: {id: this.local_student.id}})
      }
    },
    cancelSubmit: function () {
      this.$notify({
        group: 'edit',
        type: 'warn',
        title: 'Edit Cancelled',
        text: 'No changes saved'
      })
      this.$router.push({name: 'student', params: {id: this.local_student.id}})
    },
    checkValid: function (oldPsw, psw, pswConf) {
      let valid = false
      if (psw === '' || oldPsw === '') {
        this.$notify({
          group: 'edit',
          type: 'error',
          title: 'Password Is Empty',
          text: 'Your password cannot be empty'
        })
        valid = false
      } else if (psw.length < 8) {
        this.$notify({
          group: 'edit',
          type: 'error',
          title: 'Password Is Too Short',
          text: 'Your password cannot be less than 8 characters long'
        })
        valid = false
      } else if (psw !== pswConf) {
        this.$notify({
          group: 'edit',
          type: 'error',
          title: 'Passwords Do Not Match',
          text: 'You must confirm your new password'
        })
        valid = false
      } else {
        valid = true
      }
      return valid
    },
    checkPassword: function () {
      const psw = document.getElementById('newPsw').value
      const view = document.getElementById('pswCheck')
      lazy.check_password(psw, view)
    }
  }
}
</script>

<style scoped>
  table{
    margin: auto;
    text-align: left;
  }
  table tr td input{
    margin-bottom: 5px;
    padding: 5px;
  }
  #submit, #cancel{
    padding: 2px;
  }
  #submit{
    margin-right: 20px;
  }
  #pswCheck{
    display: none;
  }

  .header {
    padding-top: 15px;
    padding-bottom: 25px;
  }

  .buttons {
    padding-top: 15px;
    padding-bottom: 25px;
  }

  .edit {
    text-align: center;
  }

</style>
