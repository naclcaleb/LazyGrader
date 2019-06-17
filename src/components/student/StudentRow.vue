<template>
  <div class="student-row">
    <div class="student-name">
      <router-link :to="{name: 'student', params: {id: student.id}}">{{student.name}}</router-link>
    </div>
    <div class="student-email">
      {{student.email}}
    </div>
    <div class="student-student_id">
      {{student.student_id}}
    </div>
    <div class="student-slack_id">
      {{student.slack_id}}
    </div>
    <div class="student-github_username">
      {{student.github_username}}
    </div>
    <div class="student-canvas_id">
      {{student.canvas_id}}
    </div>
  </div>
</template>

<script>
export default {
  name: 'StudentRow',
  props: {
    student: Object
  }
}
</script>

<style scoped>
.student-row {
  display: table-row;
}

.student-name, .student-email, .student-student_id, .student-slack_id, .student-github_username, .student-canvas_id {
  display: table-cell;
  text-align: left;
  padding-left: 10px;
}
</style>
