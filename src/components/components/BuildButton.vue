<template>
  <b-btn variant="primary" class="build-button" @click="action_build($event.target, assignment, student)">
    <b-spinner v-if="building" small></b-spinner>
    {{build_button_text}}
  </b-btn>
</template>

<script>
import lazy from '../../lib/vclazygrader'

export default {
  name: 'BuildButton',
  data () {
    return {
      build_button_text: 'Build',
      building: false
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
        text: 'Green good. Your code compiled with no errors, and all tests passed'
      })
    },

    notify_failure: function () {
      this.$notify({
        group: 'build',
        title: 'Build Result',
        duration: 10000,
        text: 'Red bad. Your code compiled with errors, fix \'em and try again',
        type: 'error'
      })
    },

    build_success: function (response) {
      this.$emit('update:color', response.data.job_status)
      if (response.data.job_status === 'blue') {
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
      this.building = true

      lazy.build_assignment(student.id, assignment.id)
        .then(response => {
          this.build_success(response)
        }).catch(error => {
          this.build_failure(error)
        }).finally(function () {
          this.building = false
        }.bind(this))
    }
  }
}
</script>

<style scoped>
  .build-button {
    margin-left: 4px;
    border: none;
    width: 75px;
    padding: 4px 8px;
    text-align: center;
    text-decoration: none;
    display: inline-block;
    font-size: 12px;
  }

  .build-button:disabled {
    background-color: #BBBBBB;
  }
</style>
