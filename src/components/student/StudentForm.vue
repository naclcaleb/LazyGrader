<template>
  <div id="edit">
    <h1 class="header">Edit Student</h1>
    <div v-if="local_student == null"><loading-spinner></loading-spinner></div>
    <div v-else id="edit-form">
      <table>
        <tr>
          <td>
            <label for="student-name"><b>Name: </b></label>
            <br>
            <input type="text" id="student-name" :placeholder="local_student.name" v-model="local_student.name">
          </td>
        </tr>
        <tr>
          <td>
            <label for="student-email"><b>Email: </b></label>
            <br>
            <input type="text" id="student-email" :placeholder="local_student.email" v-model="local_student.email">
          </td>
        </tr>
        <tr>
          <td>
            <label for="student-slack-id"><b>Slack ID: </b></label>
            <br>
            <input type="text" id="student-slack-id" :placeholder="local_student.slack_id" v-model="local_student.slack_id">
          </td>
        </tr>
        <tr>
          <td>
            <label for="student-github-username"><b>GitHub Username: </b></label>
            <br>
            <input type="text" id="student-github-username" :placeholder="local_student.github_username" v-model="local_student.github_username">
          </td>
        </tr>
        <tr>
          <td class="buttons">
            <input type="submit" id="submit" v-on:click="handleSubmit">
            <input type="reset" id="cancel" v-on:click="cancelSubmit" value="Cancel">
          </td>
        </tr>
        <tr>
          <td id="pswEdit">
            <router-link :to="{name: 'pswEdit'}">Change Password</router-link>
          </td>
        </tr>
      </table>
    </div>
  </div>
</template>

<script>
import {mapActions, mapGetters} from 'vuex'
import LoadingSpinner from '../components/LoadingSpinner'
export default {
  name: 'StudentForm',
  components: {LoadingSpinner},
  data () {
    return {
      local_student: null,
      selected: 0
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
    ...mapActions({upload: 'student/upload'}),
    handleSubmit: function () {
      this.upload(this.local_student)
        .then(response => {
          this.$router.push({name: 'student', params: {id: this.local_student.id}})
          this.$notify({
            group: 'edit',
            title: 'Edit Complete',
            text: 'Changes saved'
          })
        })
    },
    cancelSubmit: function () {
      this.$router.push({name: 'student', params: {id: this.local_student.id}})
      this.$notify({
        group: 'edit',
        type: 'warn',
        title: 'Edit Cancelled',
        text: 'No changes saved'
      })
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
  #student-github-username{
    margin-bottom: 0;
  }
  #pswEdit{
    font-size: 15px;
    padding: 0;
    text-align: left;
  }

  .header {
    padding-top: 15px;
    margin-bottom: 25px;
  }

  .buttons {
    padding-top: 15px;
    padding-bottom: 25px;
  }

  #edit {
    text-align: center;
  }
</style>
