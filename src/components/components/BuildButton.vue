<template>
  <button class="build-button" @click="action_build($event.target, assignment, student)">
    {{build_button_text}}
  </button>
</template>

<script>
import lazy from '../../lib/vclazygrader'

export default {
  name: 'BuildButton',
  data () {
    return {
      build_button_text: 'Build'
    }
  },
  props: {
    assignment: Object,
    student: Object
  },
  methods: {
    notify_success: function () {
      this.$notify({
        group: 'build',
        title: 'Build Result',
        duration: 10000,
        text: 'Green good. Your code compile with no errors, and all tests passed'
      })
    },

    notify_failure: function () {
      this.$notify({
        group: 'build',
        title: 'Build Result',
        duration: 10000,
        text: 'Red bad. Your code compile with errors, fix \'em and try again',
        type: 'error'
      })
    },

    build_success: function (response) {
      this.$emit('update:color', response.data.job_status)
      if (this.color === 'blue') {
        this.notify_success()
      } else {
        this.notify_failure()
      }
      this.$emit('update:build_status_url', response.data.url)
    },

    build_failure: function (response) {
      this.$notify({
        group: 'build',
        title: 'Problem with build',
        duration: 10000,
        text: 'A problem occurred while trying to build: ' + response.toString(),
        type: 'warn'
      })
    },

    action_build: function (target, assignment, student) {
      target.disabled = true
      var buttonText = target.innerText
      target.innerText = 'Building...'

      lazy.build_assignment(student.id, assignment.id)
        .then(response => {
          console.log('Response: ', response)
          this.build_success(response)
        }).catch(error => {
          this.build_failure(error)
        }).finally(function () {
          target.disabled = false
          target.innerText = buttonText
        })
    }
  }
}
</script>

<style scoped>
  .build-button {
    margin-left: 4px;
    width: 75px;
    background-color: purple; /* Green */
    border: none;
    color: white;
    padding: 4px 8px;
    text-align: center;
    text-decoration: none;
    display: inline-block;
    font-size: 12px;
    box-shadow: 0 8px 16px 0 rgba(0,0,0,0.2), 0 6px 20px 0 rgba(0,0,0,0.19);
  }

  .build-button:disabled {
    background-color: #BBBBBB;
  }
</style>
