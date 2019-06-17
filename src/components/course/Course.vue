<template>
  <div>
    <div v-if="loading">Loading...</div>
    <div v-else>
      <h1> {{course.course_info.short_name}} - {{course.course_info.long_name}}</h1>

      <div class="course-table">
        <div class = course-row>
          <div class="course-term field-name"> Term:</div>
          <div class="course-term">{{course.term}} </div>
        </div>
        <div class = course-row>
          <div class="course-crn field-name"> CRN:</div>
          <div class="course-crn">{{course.crn}}</div>
        </div>
        <div class = course-row>
          <div class="course-canvas_id field-name"> Canvas ID:</div>
          <div class="course-canvas_id"><a :href="'https://vcccd.instructure.com/courses/' + course.canvas_id" target="_blank"> {{course.canvas_id}}</a></div>
        </div>
        <div class = course-row>
          <div class="course-github-org field-name">Github:</div>
          <div class="course-canvas_id"><a :href="course.course_info.github_org" target="_blank">{{course.course_info.github_org}}</a></div>
        </div>
      </div>
      <div>
        <h3 class="assignments-label">Assignments</h3>
        <div class="assignments-table">
          <div class="assignments-row">
            <div class="assignments-name header">
              Name
            </div>
            <div class="assignments-due header">
              Due
            </div>
            <div class="assignments-open header">
              Opens
            </div>
            <div class="assignments-close header">
              Closes
            </div>
            <div class="assignments-close header">
              Actions
            </div>
          </div>
          <course-assignment-row v-for="assignment in course.assignments" :key="assignment.id" v-bind="{assignment, course}"/>
        </div>
      </div>
      <div class="edit-link">
        <router-link :to="{name: 'course-edit', params: {id: course.id}}">
          Edit
        </router-link>
      </div>
    </div>

  </div>
</template>

<script>
import CourseAssignmentRow from './CourseAssignmentRow'
import {mapGetters, mapActions} from 'vuex'

export default {
  name: 'Course',
  components: {CourseAssignmentRow},
  data () {
    return {
      course: null,
      loading: true
    }
  },
  computed: {
    ...mapGetters({
      courseInfo: 'course/find',
      loaded: 'course/loaded'
    })
  },
  methods: {
    ...mapActions({fetch: 'course/fetch'}),
    update: function () {
      this.course = this.courseInfo(this.$route.params.id)
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
  .course-table, .assignments-table {
    display: table;
    margin: auto;
  }

  .course-row {
    display: table-row;
  }

  .course-term, .course-crn, .course-term, .course-canvas_id, .course-github-org {
    display: table-cell;
    text-align: left;
  }

  .field-name {
    font-weight: bold;
    text-align: right;
    padding-right: 7px;
    padding-left: 7px;
  }

  .assignments-table {
    display: table;
    margin-top: 10px;
  }

  .assignments-row {
    display: table-row;
  }

  .assignments-name, .assignments-due, .assignments-open, .assignments-close {
    display: table-cell;
  }

  .assignments-due, .assignments-open, .assignments-close {
    padding-left: 5px;
    padding-right: 5px;
  }

  .header {
    font-weight: bold;
  }

  .assignments-label {
    padding-top: 25px;
  }

  .edit-link {
    margin-top: 45px;
  }
</style>
