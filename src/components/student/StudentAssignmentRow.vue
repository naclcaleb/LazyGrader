<template>
  <div class="assignment-row">
    <div class="assignment-name">
      <a :href="assignment.invitation_url" target="_blank">
        {{ assignment.name }}
      </a>
    </div>
    <div class="assignment-start">
      <start-button v-show="starting && !show_buttons" :assignment="assignment" :student="student" :show_buttons.sync="show_buttons"/>
    </div>
    <div class="assignment-status">
      <a :href="build_status_url" target="_blank">
        <img v-show="show_buttons" class="status-indicator" width="16" height="16" :src="require('../../assets/' + color + '.png')">
      </a></div>
    <div class="assignment-build">
      <build-button v-show="show_buttons" :assignment="assignment" :student="student" :color.sync="color" :build_status_url.sync="build_status_url"/>
    </div>
    <div class="assignment-grade">
      <grade-button v-show="show_buttons" :assignment="assignment" :student="student" :grade_value.sync="grade_value"/>
    </div>
    <div v-if="grade_value !== null" class="grade-value">
      {{ grade_value }}
    </div>
  </div>
</template>

<script>
import {mapActions} from 'vuex'
import BuildButton from '../components/BuildButton'
import GradeButton from '../components/GradeButton'
import StartButton from '../components/StartButton'

export default {
  name: 'StudentAssignmentRow',
  components: {BuildButton, GradeButton, StartButton},
  data () {
    return {
      build_status_url: null,
      show_buttons: false,
      starting: false,
      color: 'nobuilt',
      grade_value: null
    }
  },
  props: {
    assignment: Object,
    student: Object
  },
  methods: {
    ...mapActions({
      get_assignment_status: 'student/get_assignment_status'
    })
  },
  mounted () {
    this.get_assignment_status([this.student.id, this.assignment.id])
      .then(function (response) {
        this.color = response.data.color
        this.build_status_url = response.data.build_url
        this.grade_value = response.data.grade
        if (response.data.error !== 'Not Found' && response.status === 200) {
          this.show_buttons = true
        }
      })
      .catch(function (response) {
        console.log('Unable to get assignment status: ', response)
        this.starting = true
      })
  }
}
</script>

<style scoped>
.assignment-row {
  display: table-row;
}

.assignment-name, .assignment-start, .assignment-status, .assignment-build, .assignment-grade, .grade-value {
  display: table-cell;
}

.assignment-name {
  width: 200px;
}

.assignment-status {
  width: 20px;
}

.assignment-build, .assignment-grade {
  width: 75px;
  text-align: center;
}

.grade-value {
  width: 40px;
  text-align: right;
}

.status-indicator {
  margin-bottom: -4px;
}
</style>
