<template>
  <button class="start-button" @click="action_start($event.target, assignment, student)">
    {{start_button_text}}
  </button>

</template>

<script>
import lazy from '../../lib/vclazygrader'

export default {
  name: 'StartButton',
  data () {
    return {
      start_button_text: 'Start'
    }
  },
  props: {
    assignment: Object,
    student: Object
  },
  methods: {
    action_start: function (target, assignment, student) {
      console.log('Starting: ', student)
      lazy.start_assignment(assignment.id, student.id)
        .then(function (response) {
          console.log('Start response: ', response)
          this.$emit('update:show_buttons', true)
          window.open(assignment.invitation_url, '_blank')
        }.bind(this))
        .catch(function (error) {
          console.log('Start error: ', error)
        })
    }
  }
}
</script>

<style scoped>
  .start-button {
    margin-left: 4px;
    width: 75px;
    background-color: #4CAF50; /* Green */
    border: none;
    color: white;
    padding: 4px 8px;
    text-align: center;
    text-decoration: none;
    display: inline-block;
    font-size: 12px;
    box-shadow: 0 8px 16px 0 rgba(0,0,0,0.2), 0 6px 20px 0 rgba(0,0,0,0.19);
  }

  .start-button:disabled {
    background-color: #BBBBBB;
  }
</style>
