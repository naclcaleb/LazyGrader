<template>
  <div>
    <h1>{{ title }}</h1>
    <AuthorizedStudentDiv :loaded="students_loaded" :authenticated="authenticated" :role="role">
      <div class="students-table">
        <div class="student-row">
          <div class="student-name header">Name</div>
          <div class="student-email header">Email</div>
          <div class="student-student_id header">Student ID</div>
          <div class="student-slack_id header">Slack ID</div>
          <div class="student-github_username header">Github ID</div>
          <div class="student-canvas_id header">Canvas ID</div>
        </div>
        <student-row v-for="student in students" :student="student" :key="student.id" />
      </div>
    </AuthorizedStudentDiv>
  </div>
</template>

<script>
import {mapState, mapActions} from 'vuex'
import StudentRow from './StudentRow'
import AuthorizedStudentDiv from '../components/AuthorizedStudentDiv'

export default {
  name: 'Students',
  components: {StudentRow, AuthorizedStudentDiv},
  data () {
    return {
      title: 'Ventura College Students',
      loaded: false
    }
  },
  computed: {
    ...mapState({
      authenticated: state => state.user.authenticated,
      role: state => state.user.user.role,
      students: state => state.student.collection,
      students_loaded: state => state.student.loaded
    })
  },
  methods: {
    ...mapActions({
      fetch_courses: 'student/fetch'
    })
  },
  mounted () {
    if (!this.students_loaded) {
      this.fetch_courses()
        .then(response => {
          this.loaded = true
          console.log('Loaded')
        })
    }
  }
}
</script>

<style scoped>
.students-table {
  display: table;
  margin: auto;
}

.header {
  font-weight: bold;
}

.student-row {
  display: table-row;
}

.student-name, .student-email, .student-student_id, .student-slack_id, .student-github_username, .student-canvas_id {
  display: table-cell;
}
</style>
