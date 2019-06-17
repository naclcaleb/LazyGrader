<template>
  <div>
    <div v-if="student == null" class="loading">Loading...</div>
    <div v-else>
      <h1>{{ student.name }}</h1>

      <div class="student-table">
        <div class="student-row">
          <div class="student-email label">Email:</div>
          <div class="student-email">{{ student.email }}</div>
        </div>
        <div class="student-row">
          <div class="student-student_id label">Student ID:</div>
          <div class="student-student_id">{{ student.student_id }}</div>
        </div>
        <div class="student-row">
          <div class="student-slack_id label">Slack ID:</div>
          <div class="student-slack_id">{{ student.slack_id }}</div>
        </div>
        <div class="student-row">
          <div class="student-github_username label">GitHub Username:</div>
          <div class="student-github_username">{{ student.github_username }}</div>
        </div>
        <div class="student-row">
          <div class="student-canvas_id label">Canvas ID:</div>
          <div class="student-canvas_id">{{ student.canvas_id }}</div>
        </div>
      </div>
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

export default {
  name: 'Student',
  components: {StudentCourses, VCFooter},
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
  display: table;
  margin: auto;
}

.student-row {
  display: table-row;
}

.student-email, .student-student_id, .student-slack_id, .student-github_username, .student-canvas_id {
  display: table-cell;
  text-align: left;
}

.label {
  font-weight: bold;
  text-align: right;
  padding-right: 10px;
}
</style>
