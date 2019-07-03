<template>
  <div v-if="assignment !== null">
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
        <copy-button :copyText="assignment.canvas_id"></copy-button>
      </tr>
    </table>
    <div class="edit-link" >
      <router-link :to="{name: 'assignment-edit', params: { id: assignment.id}}" tag="button">Edit</router-link>
    </div>
      <div>
      <h2>Students</h2>
      <div class="students-table">
        <assignment-student-row v-for="enrollment in assignment.course.enrollments" :student_id="enrollment.student_id" :assignment="assignment" :key="enrollment.id"/>
      </div>
    </div>
  </div>
</template>

<script>
import {mapGetters, mapActions} from 'vuex'
import AssignmentStudentRow from './AssignmentStudentRow'
import CopyButton from '../components/CopyButton'

export default {
  name: 'Assignment',
  components: {CopyButton, AssignmentStudentRow},
  data () {
    return {
      assignment: null,
      loading: true
    }
  },
  computed: {
    ...mapGetters({
      assignmentInfo: 'assignment/find',
      loaded: 'assignment/loaded'
    }),
    canvas_url: function () {
      return `https://vcccd.instructure.com/courses/${this.assignment.course.canvas_id}/assignments/${this.assignment.canvas_id}`
    }
  },
  methods: {
    ...mapActions({fetch: 'assignment/fetch'}),
    update: function () {
      this.assignment = this.assignmentInfo(this.$route.params.id)
      this.loading = false
    }
  },
  mounted () {
    if (this.loaded) {
      this.update()
    } else {
      this.fetch()
        .then(response => {
          this.update()
        })
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
</style>
