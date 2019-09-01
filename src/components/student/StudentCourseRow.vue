<template>
  <div class="course-name">
    {{ course.course_info.long_name }} Assignments (Plicker #<a target="_blank" :href="'http://assets.plickers.com/plickers-cards/PlickersCards_1up_1-63.pdf#page=' + plicker">{{plicker}}</a>)
    <div class="assignment-table">
    <student-assignment-row v-for="assignment in assignments" :assignment="assignment" :key="assignment.id" :student="student"/>
    </div>
  </div>
</template>

<script>
import {mapActions} from 'vuex'
import StudentAssignmentRow from './StudentAssignmentRow'

export default {
  name: 'StudentCourseRow',
  components: {StudentAssignmentRow},
  data () {
    return {
      assignments: []
    }
  },
  props: {
    course: Object,
    student: Object,
    plicker: Number
  },
  methods: {
    ...mapActions({
      get_assignments_for_course: 'assignment/get_assignments_for_course'
    })
  },
  mounted () {
    this.get_assignments_for_course(this.course.id)
      .then(response => {
        this.assignments = response.data
      })
      .catch(error => {
        console.log('Unable to get assignments for course: ', error)
      })
  }
}
</script>

<style scoped>
.course-name {
  text-align: left;
  font-weight: bolder;
  margin-top: 15px;
  margin-bottom: 20px;
}

.assignment-table {
  display: table;
  margin-bottom: 25px;
  margin-top: 7px;
  font-weight: normal;
}
</style>
