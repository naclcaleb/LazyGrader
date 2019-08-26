<template>
  <div class="edit">
    <h1 class="header">Edit Password</h1>
    <table>
      <tr>
        <td>
          <label for="oldPsw"><b>Old Password:</b></label><br>
          <input type="password" v-model="password.old_password" id="oldPsw" placeholder="Old Password" required>
        </td>
      </tr>
      <tr>
        <td>
          <label for="newPsw"><b>New Password:</b></label><br>
          <input type="password" v-model="password.new_password" id="newPsw" placeholder="New Password" required @change="checkPassword">
        </td>
      </tr>
      <tr>
        <td>
          <p id="pswCheck"></p>
        </td>
      </tr>
      <tr>
        <td>
          <label for="newPswConf"><b>Confirm Password:</b></label><br>
          <input type="password" v-model="password.new_password_conf" id="newPswConf" placeholder="New Password" required>
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
import {mapGetters, mapActions} from 'vuex'
import lazy from '../../lib/vclazygrader'

export default {
  name: 'ChangePassword',
  data () {
    return {
      local_student: null,
      password: {
        id: 0,
        old_password: '',
        new_password: '',
        new_password_conf: ''
      }
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
    ...mapActions({
      change_password: 'student/change_password'
    }),
    handleSubmit: function () {
      if (this.checkValid(this.password.old_password, this.password.new_password, this.password.new_password_conf)) {
        this.password.id = this.local_student.id
        this.change_password(this.password)
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
      const psw = this.password.new_password
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
