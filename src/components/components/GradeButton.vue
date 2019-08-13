<template>
  <b-btn variant="info" class="grade-button" @click="action_grade($event.target, assignment, student)">
    <b-spinner v-if="grading" small></b-spinner>
    {{grade_button_text}}
    <b-badge v-if="score != null && !grading" variant="light">{{score}}</b-badge>
  </b-btn>

</template>

<script>
import lazy from '../../lib/vclazygrader'

export default {
  name: 'GradeButton',
  data () {
    return {
      grade_button_text: 'Grade',
      grading: false,
      score: null
    }
  },
  props: {
    assignment: Object,
    student: Object
  },
  methods: {
    action_grade: function (target, assignment, student) {
      this.grading = true
      lazy.grade_assignment(student.id, assignment.id)
        .then(function (response) {
          this.score = response.data.grade
          this.$notify({
            group: 'grade',
            title: 'Grading Result',
            text: 'You should now see a score of ' + response.data.grade + ' in Canvas for this assignment'
          })
        }.bind(this))
        .catch(function (error) {
          this.$notify({
            group: 'grade',
            title: 'System Error',
            text: `Error while grading assignment ${error.error}. Notify the instructor`,
            type: 'warn'
          })
          this.score = error.response.data.grade
        }.bind(this))
        .finally(function () {
          this.grading = false
        }.bind(this))
    }
  }
}
</script>

<style scoped>
  .grade-button {
    margin-left: 4px;
    width: 75px;
    border: none;
    padding: 4px 8px;
    text-align: center;
    text-decoration: none;
    display: inline-block;
    font-size: 12px;
  }

  .grade-button:disabled {
    background-color: #BBBBBB;
  }

</style>
