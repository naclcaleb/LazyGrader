<template>
  <div class="center-page">
    <h1>{{ title }}</h1>
    <authenticated-div>
      <bulk-upload class="bulk-upload"></bulk-upload>
      <b-tabs>
        <b-tab v-for="course in courses" :key="course.id" :title="course.course_info.short_name">
          <h3 class="course-title">{{course.course_info.long_name}}</h3>
          <student-table :students="course.enrollments" :course="course"></student-table>
        </b-tab>
      </b-tabs>
    </authenticated-div>
  </div>
</template>

<script>
import {mapState, mapActions} from 'vuex'
import AuthenticatedDiv from '../components/AuthenticatedDiv'
import bulkUpload from '../components/BulkUpload'
import StudentTable from './StudentTable'

export default {
  name: 'Students',
  components: {AuthenticatedDiv, bulkUpload, StudentTable},
  computed: {
    ...mapState({
      courses: state => state.course.collection,
      students_loaded: state => state.course.loaded
    }),
    title () {
      return this.$store.state.settings.settings.college_name + ' Students'
    }
  },
  methods: {
    ...mapActions({
      fetch_courses: 'course/fetch',
      fetch: 'student/fetch'
    })
  },
  mounted () {
    this.fetch()
    if (!this.students_loaded) {
      this.fetch_courses()
    }
  }
}
</script>

<style scoped>

.center-page {
  text-align: center;
  margin-bottom: 15px;
}

.course-title {
  margin-top: 15px;
  margin-bottom: 25px;
}

.bulk-upload {
  margin-top: 15px;
  margin-bottom: 15px;
}
</style>
