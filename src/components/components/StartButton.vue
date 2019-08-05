<template>
  <b-btn class="start-button" variant="success" size="sm" @click="action_start($event.target, assignment, student)">
    {{start_button_text}}
  </b-btn>

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
    padding: 4px 8px;
    display: inline-block;
    font-size: 12px;
  }

  .start-button:disabled {
    background-color: #BBBBBB;
  }
</style>
