<template>
  <div class="course-row">
    <div class="course-name"><router-link :to="{name:'course', params: {id: course.id}}">{{ course.course_info.short_name }}</router-link>  - {{ course.course_info.long_name }}</div>
    <div class="course-term">{{ course.term }}</div>
  </div>
</template>

<script>
export default {
  name: 'CourseRow',
  props: {
    course: Object
  }
}
</script>

<style scoped>
.course-short {
  display: table-cell;
  width: 75px;
  text-align: left;
}

.course-long, .course-name {
  display: table-cell;
  width: 300px;
  text-align: left;
}

.course-term {
  display: table-cell;
  width: 100px;
  text-align: left;
}
</style>
