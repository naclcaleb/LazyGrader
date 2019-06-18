<template>
  <div>
    <div v-if="student == null" class="loading">Loading...</div>
    <div v-else>
      <h1>{{ student.name }}</h1>

      <table class="student-table">
        <tr class="student-row">
          <th class="student-email label">Email:</th>
          <td class="student-email">{{ student.email }}<copy-button :copyText="student.email"></copy-button></td>
        </tr>
        <tr class="student-row">
          <th class="student-student_id label">Student ID:</th>
          <td class="student-student_id">{{ student.student_id }}<copy-button :copyText="student.student_id"></copy-button></td>
        </tr>
        <tr class="student-row">
          <th class="student-slack_id label">Slack ID:</th>
          <td class="student-slack_id">{{ student.slack_id }}<copy-button :copyText="student.slack_id"></copy-button></td>
        </tr>
        <tr class="student-row">
          <th class="student-github_username label">GitHub Username:</th>
          <td class="student-github_username">{{ student.github_username }}<copy-button :copyText="student.github_username"></copy-button></td>
        </tr>
        <tr class="student-row">
          <th class="student-canvas_id label">Canvas ID:</th>
          <td class="student-canvas_id">{{ student.canvas_id }}<copy-button :copyText="student.canvas_id"></copy-button></td>
        </tr>
      </table>
    </div>
    <h2>Courses</h2>
    <div v-if="courses == null" class="loading">Loading...</div>
    <student-courses v-else :courses="courses"/>
    <v-c-footer/>
  </div>
</template>

<script>
import lazy from '../../lib/vclazygrader'
import StudentCourses from './StudentCourses'
import VCFooter from '../Footer'
import CopyButton from '../components/CopyButton'

export default {
  name: 'Student',
  components: {CopyButton, StudentCourses, VCFooter},
  data () {
    return {
      student: null,
      courses: []
    }
  },
  mounted () {
    var context = this
    lazy.get_student(this.$route.params.id, {success: function (response) {
      context.student = response.data
    }})

    lazy.get_courses_for(this.$route.params.id, {success: function (response) {
      context.courses = response.data
    }})
  }
}
</script>

<style scoped>
.student-table {
  margin: auto;
}

.student-row {
  display: table-row;
}

.student-email, .student-student_id, .student-slack_id, .student-github_username, .student-canvas_id {
  display: table-cell;
  text-align: center;
}

.label {
  font-weight: bold;
  text-align: right;
  padding-right: 10px;
}
td{
  border: 1px solid black;
}
td button{
  float:right;
}
</style>
