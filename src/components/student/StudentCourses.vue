<template>
  <div class="student-courses-table">
    <student-course-row v-for="row in courses" :course="row.course" :student="row.student" :key="row.course.id"/>
  </div>
</template>

<script>
import StudentCourseRow from './StudentCourseRow'

export default {
  name: 'StudentCourses',
  components: {StudentCourseRow},
  props: {
    courses: Array
  }
}
</script>

<style scoped>
.student-courses-table {
  display: table;
  margin: auto;
}
</style>
