<template>
  <button class="grade-button" @click="action_grade($event.target, assignment, student)">
    {{grade_button_text}}
  </button>

</template>

<script>
import lazy from '../../lib/vclazygrader'

export default {
  name: 'GradeButton',
  data () {
    return {
      grade_button_text: 'Grade'
    }
  },
  props: {
    assignment: Object,
    student: Object
  },
  methods: {
    action_grade: function (target, assignment, student) {
      target.disabled = true
      var buttonText = target.innerText
      target.innerText = 'Grading...'

      lazy.grade_assignment(student.id, assignment.id)
        .then(function (response) {
          this.$emit('update:grade_value', response.data.grade)
          this.$notify({
            group: 'grade',
            title: 'Grading Result',
            text: 'You should now see a score of ' + response.data.grade + ' in Canvas for this assignment'
          })
        }.bind(this))
        .catch(function (error) {
          console.log('Error grading: ', error)
        })
        .finally(function () {
          target.disabled = false
          target.innerText = buttonText
        })
    }
  }
}
</script>

<style scoped>
  .grade-button {
    margin-left: 4px;
    width: 75px;
    background-color: dodgerblue; /* Green */
    border: none;
    color: white;
    padding: 4px 8px;
    text-align: center;
    text-decoration: none;
    display: inline-block;
    font-size: 12px;
    box-shadow: 0 8px 16px 0 rgba(0,0,0,0.2), 0 6px 20px 0 rgba(0,0,0,0.19);
  }

  .grade-button:disabled {
    background-color: #BBBBBB;
  }

</style>
