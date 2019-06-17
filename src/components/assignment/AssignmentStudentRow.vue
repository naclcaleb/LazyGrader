<template>
  <div v-if="!loading" class="student-row">
    <div class="student-name">
      <router-link :to="{name: 'student', params: {id: student_id}}">{{student.name}}</router-link>
    </div>
    <div class="student-assignment_status">
      <a :href="build_status_url" target="_blank">
        <img v-show="show_buttons" class="status-indicator" width="16" height="16" :src="require('../../assets/' + color + '.png')">
      </a>
    </div>
    <div class="student-build_button">
      <build-button v-show="show_buttons" :assignment="assignment" :student="student"/>
    </div>
    <div class="student-grade_button">
      <grade-button v-show="show_buttons" :assignment="assignment" :student="student"/>
    </div>
  </div>
</template>

<script>
import lazy from '../../lib/vclazygrader'
import {mapGetters, mapActions} from 'vuex'
import StartButton from '../components/StartButton'
import BuildButton from '../components/BuildButton'
import GradeButton from '../components/GradeButton'

export default {
  name: 'AssignmentStudentRow',
  components: {GradeButton, BuildButton, StartButton},
  data () {
    return {
      loading: true,
      build_status_url: null,
      show_buttons: false,
      color: 'nobuilt',
      student: null
    }
  },
  props: {
    assignment: Object,
    student_id: Number
  },
  computed: {
    ...mapGetters({
      studentInfo: 'student/find',
      loaded: 'student/loaded'
    })
  },
  methods: {
    ...mapActions({
      fetch: 'student/fetch'
    }),
    update: function () {
      this.student = this.studentInfo(this.student_id)
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
    lazy.get_assignment_status(this.student_id, this.assignment.id)
      .then(function (response) {
        this.color = response.data.color
        this.build_status_url = response.data.build_url
        this.grade_value = response.data.grade
        if (response.data.error !== 'Not Found' && response.status === 200) {
          this.show_buttons = true
        }
      }.bind(this))
      .catch(function (response) {
        this.starting = true
      }.bind(this))
  }
}
</script>

<style scoped>
.student-row {
  display: table-row;
}

.student-name, .student-assignment_status, .student-build_button, .student-grade_button {
  display: table-cell;
  text-align: left;
}

.student-name {
  padding-right: 15px;
}

.status-indicator {
  margin-bottom: -4px;
}
</style>
