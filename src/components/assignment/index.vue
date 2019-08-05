<template>
  <div class="centered-page">
    <h1>Assignments</h1>
    <bulk-upload class="bulk-upload" :resource_type="'assignment'"></bulk-upload>

    <b-tabs>
      <div v-for="course in courses" :key="course.id">
        <b-tab :title="course.course_info.short_name">
          <h3 class="course-title">{{course.course_info.long_name}}</h3>
          <assignment-table :assignments="course.assignments"></assignment-table>
`       </b-tab>
      </div>
    </b-tabs>
  </div>
</template>

<script>
import {mapState, mapActions} from 'vuex'
import AuthorizedDiv from '../components/AuthorizedDiv'
import BulkUpload from '../components/BulkUpload'
import AssignmentTable from '../assignment/AssignmentTable'

export default {
  name: 'Assignment',
  components: {AuthorizedDiv, BulkUpload, AssignmentTable},
  data () {
    return {
      assignment_fields: {
        name: {},
        due_date: {},
        open_date: {},
        close_date: {},
        invitation_url: {
          label: 'Invitation'
        }
      }
    }
  },

  computed: {
    ...mapState({
      courses: state => state.course.collection,
      courses_loaded: state => state.course.loaded
    })
  },

  methods: {
    ...mapActions({
      fetch_courses: 'course/fetch'
    })
  },

  mounted () {
    if (!this.courses_loaded) {
      this.fetch_courses()
    }
  }
}

</script>

<style scoped>
.bulk-upload {
  text-align: center;
  margin-top: 15px;
  margin-bottom: 15px;
}

.course-title {
  margin-top: 15px;
  margin-bottom: 25px;
}

.centered-page {
  text-align: center;
}
</style>
