<template>
  <div>
    <div v-if="!loaded" class="loading"><loading-spinner></loading-spinner></div>
    <div v-else-if="course == null">
      Unable to display information about courses for which you are not enrolled
    </div>
    <div v-else>
      <h1 class="course-name"> {{course.course_info.short_name}} - {{course.course_info.long_name}}</h1>

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
      <authorized-div class="edit-link" :role="'admin'">
        <router-link :to="{name: 'course-edit', params: {id: course.id}}" tag="button">
          <div class="edit-link-text">Edit</div>
        </router-link>
      </authorized-div>
      <b-tabs>
        <b-tab title="Assignments">
          <assignment-table :assignments="course.assignments"/>
        </b-tab>
        <authorized-div :role="'admin'">
        <b-tab title="Students">
          <student-table :students="course.enrollments" :course="course"></student-table>
        </b-tab>
        </authorized-div>
      </b-tabs>
    </div>

  </div>
</template>

<script>
import _ from 'lodash'
import CourseAssignmentRow from './CourseAssignmentRow'
import {mapGetters, mapActions} from 'vuex'
import LoadingSpinner from '../components/LoadingSpinner'
import AuthorizedDiv from '../components/AuthorizedDiv'
import StudentTable from '../student/StudentTable'
import AssignmentTable from '../assignment/AssignmentTable'
import AuthenticatedDiv from '../components/AuthenticatedDiv'

export default {
  name: 'Course',
  data () {
    return {
      student_fields: {
        name: {
          key: 'student.name',
          label: 'Name',
          class: 'student-name'
        },
        email: {
          key: 'student.email',
          label: 'Student Email'
        },
        slack_id: {
          key: 'student.slack_id',
          label: 'Slack'
        },
        github: {
          key: 'student.github_username',
          label: 'GitHub Username'
        },
        student_id: {
          key: 'student.student_id',
          label: 'Student ID'
        },
        canvas_id: {
          key: 'student.canvas_id',
          label: 'Canvas ID',
          class: 'right-aligned'
        }
      }
    }
  },
  props: ['id'],
  components: {AuthenticatedDiv, AuthorizedDiv, LoadingSpinner, CourseAssignmentRow, StudentTable, AssignmentTable},
  computed: {
    ...mapGetters({
      courseInfo: 'course/find',
      loaded: 'course/loaded'
    }),

    course: function () {
      return this.$store.getters['course/find'](this.id)
    },

    students: function () {
      return _.map(this.course.enrollments, (enrollment) => enrollment.student)
    }
  },
  methods: {
    ...mapActions({fetch_courses: 'course/fetch'})
  },
  mounted () {
    if (!this.loaded) {
      console.log('course: ', this.course)
      this.fetch_courses()
        .catch(error => {
          console.log('error: ', error)
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

  .course-name {
    text-align: center;
  }

  .edit-link {
    margin-top: 35px;
    text-align: center;
  }

  .students-table {
    margin: 20px;
  }

</style>

<style>
  .right-aligned {
    text-align: right;
  }
</style>
