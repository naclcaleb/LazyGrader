<template>
  <div v-if="assignment !== null">
    <h1>{{assignment.name}}</h1>
    <div class="assignment-table">
      <div class="assignment-row">
        <div class="assignment-url label">GitHub Classroom</div>
        <div class="assignment-url">{{assignment.invitation_url}}</div>
      </div>
      <div class="assignment-row">
        <div class="assignment-due label">Due</div>
        <div class="assignment-due">{{assignment.due_date}}</div>
      </div>
      <div class="assignment-row">
        <div class="assignment-open label">Opens</div>
        <div class="assignment-open">{{assignment.open_date}}</div>
      </div>
      <div class="assignment-row">
        <div class="assignment-close label">Closes</div>
        <div class="assignment-close">{{assignment.close_date}}</div>
      </div>
      <div class="assignment-row">
        <div class="assignment-canvas_id label">Canvas ID</div>
        <div class="assignment-canvas_id">
          <a :href="canvas_url">{{assignment.canvas_id}}</a>
        </div>
      </div>
    </div>
    <div>
      <h2>Students</h2>
      <div class="students-table">
        <assignment-student-row v-for="enrollment in assignment.course.enrollments" :student_id="enrollment.student_id" :assignment="assignment" :key="enrollment.id"/>
      </div>
    </div>
    <div class="edit-link" >
      <router-link :to="{name: 'assignment-edit', params: { id: assignment.id}}">Edit</router-link>
    </div>
  </div>
</template>

<script>
import {mapGetters, mapActions} from 'vuex'
import AssignmentStudentRow from './AssignmentStudentRow'

export default {
  name: 'Assignment',
  components: {AssignmentStudentRow},
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
.assignment-table, .students-table {
  display: table;
  margin: auto;
}

.assignment-row {
  display: table-row;
}

.assignment-url, .assignment-due, .assignment-open, .assignment-close, .assignment-canvas_id {
  display: table-cell;
  padding-left: 5px;
  padding-right: 5px;
  text-align: left;
}

.label {
  font-weight: bold;
  text-align: right;
}

.edit-link {
  padding-top: 25px;
}
</style>
