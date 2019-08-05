<template>
  <b-tabs class="student-courses-table">
    <b-tab v-for="row in courses" :title="row.course.course_info.short_name" :key="row.course.id">
      <student-course-row :course="row.course" :student="row.student" :key="row.course.id"/>
    </b-tab>
  </b-tabs>
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
