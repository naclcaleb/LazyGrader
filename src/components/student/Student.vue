<template>
  <div class="centered">
    <div v-if="!loaded" class="loading"><loading-spinner></loading-spinner></div>
    <div v-else-if="student == null">
      Unable to display information about another student
    </div>
    <div v-else>
      <h1>{{ student.name }}</h1>

      <table class="student-table">
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
      <div  v-if="student != null">
        <router-link class="edit-link" :to="{name: 'student-edit', params: {id: student.id}}" tag="button">Edit</router-link>
      </div>
      <h2>Courses</h2>
      <div v-if="courses == null" class="loading"><loading-spinner></loading-spinner></div>
      <student-courses v-else :courses="courses"/>
    </div>
  </div>
</template>

<script>
import StudentCourses from './StudentCourses'
import VCFooter from '../Footer'
import CopyButton from '../components/CopyButton'
import {mapGetters, mapState, mapActions} from 'vuex'
import LoadingSpinner from '../components/LoadingSpinner'
import AuthorizedDiv from '../components/AuthorizedDiv'

export default {
  name: 'Student',
  props: ['id'],
  components: {AuthorizedDiv, LoadingSpinner, CopyButton, StudentCourses, VCFooter},
  data () {
    return {
      courses: []
    }
  },
  computed: {
    ...mapState({
      loaded: state => state.student.loaded
    }),
    ...mapGetters({
      studentInfo: 'student/find'
    }),

    student: function () {
      return this.$store.getters['student/find'](this.id)
    }
  },
  methods: {
    ...mapActions({
      fetch: 'student/fetch',
      coursesFor: 'course/fetch_courses_for'
    })
  },
  beforeRouteEnter (to, from, next) {
    if (to.params.role === 'student') {
      next('/student/:id')
    } else {
      next()
    }
  },
  mounted () {
    if (!this.loaded) {
      this.fetch()
    }

    this.coursesFor(this.$route.params.id)
      .then(response => {
        this.courses = response.data
      })
      .catch(error => {
        console.log('Unable to fetch courses for student id: ' + this.$route.params.id + ': ', error)
      })
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
  padding-right: 15px;
  padding-left: 15px;
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

.edit-link {
  margin-top: 15px;
  margin-bottom: 15px;
}

.centered {
  text-align: center;
}
#copyButton{
  padding-left: 5px;
}
</style>
