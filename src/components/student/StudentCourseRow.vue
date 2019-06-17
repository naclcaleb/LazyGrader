<template>
  <div class="course-name">
    {{ course.course_info.short_name }} - {{ course.course_info.long_name }} {{ course.term }} Assignments
    <div class="assignment-table">
    <student-assignment-row v-for="assignment in assignments" :assignment="assignment" :key="assignment.id" :student="student"/>
    </div>
  </div>
</template>

<script>
import lazy from '../../lib/vclazygrader'
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
    student: Object
  },
  mounted () {
    var context = this
    lazy.get_assignments_for_course(this.course.id, {success: function (response) {
      context.assignments = response.data
    }})
  }
}
</script>

<style scoped>
.course-name {
  text-align: left;
  font-weight: bolder;
}

.assignment-table {
  display: table;
  margin-bottom: 25px;
  margin-top: 7px;
  font-weight: normal;
}
</style>
