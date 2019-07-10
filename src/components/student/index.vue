<template>
  <div>
    <h1>{{ title }}</h1>
    <div v-if="students == null" class="loading">Loading...</div>
    <div v-else class="students-table">
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
  </div>
</template>

<script>
import {mapGetters, mapActions} from 'vuex'
import StudentRow from './StudentRow'

export default {
  name: 'Students',
  components: {StudentRow},
  data () {
    return {
      title: 'Ventura College Students'
    }
  },
  computed: {
    ...mapGetters({
      students: 'student/collection',
      students_loaded: 'student/loaded'
    })
  },
  methods: {
    ...mapActions({
      fetch: 'student/fetch'
    })
  },
  mounted () {
    if (!this.students_loaded) {
      this.fetch()
        .then(response => {
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
