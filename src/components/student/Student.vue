<template>
  <div>
    <div v-if="student == null" class="loading">Loading...</div>
    <div v-else>
      <h1>{{ student.name }}</h1>

      <table class="student-table">
        <tr class="student-row">
          <th class="label">Email:</th>
          <td class="student-email">{{ student.email }}</td>
          <copy-button :copyText="student.email"></copy-button>
        </tr>
        <tr class="student-row">
          <th class="label">Student ID:</th>
          <td class="student-student_id">{{ student.student_id }}</td>
          <copy-button :copyText="student.student_id"></copy-button>
        </tr>
        <tr class="student-row">
          <th class="label">Slack ID:</th>
          <td class="student-slack_id">{{ student.slack_id }}</td>
          <copy-button :copyText="student.slack_id"></copy-button>
        </tr>
        <tr class="student-row">
          <th class="label">GitHub Username:</th>
          <td class="student-github_username">{{ student.github_username }}</td>
          <copy-button :copyText="student.github_username"></copy-button>
        </tr>
        <tr class="student-row">
          <th class="label">Canvas ID:</th>
          <td class="student-canvas_id">{{ student.canvas_id }}</td>
          <copy-button :copyText="student.canvas_id.toString()"></copy-button>
        </tr>
      </table>
    </div>
    <h2>Courses</h2>
    <div v-if="courses == null" class="loading">Loading...</div>
    <student-courses v-else :courses="courses"/>
    <router-link :to="{name: 'student-edit', params: {id: student.id}}" tag="button">Edit</router-link>
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
  padding-right:5px;
}
td{
  border: 1px solid black;
  padding:0;
}
#copyButton{
  padding-left: 5px;
}
</style>
