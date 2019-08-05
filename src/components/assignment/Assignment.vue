<template>
  <div class="centered">
    <div v-if="!loaded" class="loading"><loading-spinner></loading-spinner></div>
    <div v-else-if="assignment == null">
      Unable to display assignment for course for which you are not enrolled
    </div>
    <div v-else>
      <h1>{{assignment.name}}</h1>
      <table class="assignment-table">
        <tr class="assignment-row">
          <th class="assignment-url label">GitHub Classroom:</th>
          <td class="assignment-url"><a v-bind:href="assignment.invitation_url" target="_blank">{{assignment.invitation_url}}</a></td>
          <copy-button :copyText="assignment.invitation_url"></copy-button>
        </tr>
        <tr class="assignment-row">
          <th class="assignment-due label">Due:</th>
          <td class="assignment-due">{{assignment.due_date}}</td>
          <copy-button :copyText="assignment.due_date"></copy-button>
        </tr>
        <tr class="assignment-row">
          <th class="assignment-open label">Opens:</th>
          <td class="assignment-open">{{assignment.open_date}}</td>
          <copy-button :copyText="assignment.open_date"></copy-button>
        </tr>
        <tr class="assignment-row">
          <th class="assignment-close label">Closes:</th>
          <td class="assignment-close">{{assignment.close_date}}</td>
          <copy-button :copyText="assignment.close_date"></copy-button>
        </tr>
        <tr class="assignment-row">
          <th class="assignment-canvas_id label">Canvas ID:</th>
          <td class="assignment-canvas_id">
            <a :href="canvas_url" target="_blank">{{assignment.canvas_id}}</a>
          </td>
          <copy-button :copyText="assignment.canvas_id.toString()"></copy-button>
        </tr>
      </table>
      <authorized-div class="edit-link" :loaded="loaded" :role="'admin'" :hide-only="true">
        <router-link :to="{name: 'assignment-edit', params: { id: assignment.id}}" tag="button">Edit</router-link>

        <h2>Students</h2>
        <div class="students-table">
          <assignment-student-row v-for="enrollment in assignment.course.enrollments" :student_id="enrollment.student_id" :assignment="assignment" :key="enrollment.id"/>
        </div>
      </authorized-div>
    </div>
  </div>
</template>

<script>
import {mapActions, mapState} from 'vuex'
import AssignmentStudentRow from './AssignmentStudentRow'
import CopyButton from '../components/CopyButton'
import AuthorizedDiv from '../components/AuthorizedDiv'
import LoadingSpinner from '../components/LoadingSpinner'

export default {
  name: 'Assignment',
  components: {LoadingSpinner, AuthorizedDiv, CopyButton, AssignmentStudentRow},
  props: ['id'],
  computed: {
    ...mapState({
      loaded: state => state.assignment.loaded
    }),

    canvas_url: function () {
      return `https://vcccd.instructure.com/courses/${this.assignment.course.canvas_id}/assignments/${this.assignment.canvas_id}`
    },

    assignment: function () {
      return this.$store.getters['assignment/find'](this.id)
    }
  },
  methods: {
    ...mapActions({fetch: 'assignment/fetch'})
  },
  mounted () {
    if (!this.loaded) {
      this.fetch()
    }
  }
}
</script>

<style scoped>
.students-table {
  display: table;
  margin: auto;
}
table{
  margin: auto;
}
table tr {}
table tr td{
  padding-left: 5px;
  padding-right: 5px;
  text-align: left;
  border: 1px solid black;
}

.label {
  font-weight: bold;
  text-align: right;
  padding-right: 5px;
  border: 0;
}

.edit-link {
  padding-top: 25px;
}

  .centered {
    text-align: center;
  }
</style>
