<template>
  <div>
    <h2>{{course.course_info.long_name}}</h2>

    <form id="course-edit" @submit.prevent="handleSubmit">
      <div class="course-table">
        <div class="course-row">
          <div class="course-canvas_id label">
            Canvas ID:
          </div>
          <div class="course-canvas_id">
            <input v-model.number="course.canvas_id" class="course-canvas_id">
          </div>
        </div>
        <div class="course-row">
          <div class="course-crn label">
            CRN:
          </div>
          <div class="course-crn">
            <input v-model.number="course.crn" class="course-crn">
          </div>
        </div>
        <div class="course-row">
          <div class="course-term label">
            Term:
          </div>
          <div class="course-term">
            <input v-model="course.term">
          </div>
        </div>
        <div class="course-row">
          <div class="course-course_info label">Instance of:</div>
          <select class="course-course_info" v-model="selected">
            <option v-for="info in course_infos" :key="info.id" :value="info.id">
              {{info.short_name}} - {{info.long_name}}
            </option>
          </select>
        </div>
      </div>
      <input type="submit" />
      <button @click="cancelSubmit">Cancel</button>
    </form>
  </div>
</template>

<script>
import lazy from '../../lib/vclazygrader'

export default {
  name: 'CourseForm',
  data () {
    return {
      course_infos: null,
      selected: 0
    }
  },
  props: {
    course: Object
  },
  mounted () {
    this.selected = this.course.course_info_id
    lazy.get_course_infos({
      success: function (response) {
        this.course_infos = response.data
      }.bind(this)
    })
  },
  methods: {
    handleSubmit: function () {
      this.course.course_info_id = this.selected
      console.log('submit: ', this.course)
      this.$router.push({name: 'course', params: {id: this.course.id}})
      this.$notify({
        group: 'grade',
        title: 'Edit Complete',
        text: 'Changes saved'

      })
    },
    cancelSubmit: function () {
      this.$router.push({name: 'course', params: {id: this.course.id}})
      this.$notify({
        group: 'grade',
        type: 'warn',
        title: 'Edit Cancelled',
        text: 'No changes saved'

      })
    }
  }
}

</script>

<style scoped>

.course-table {
  margin: auto;
  display: table;
}
.course-row {
  display: table-row;
}
.course-course_info, .course-canvas_id, .course-term, .course-crn {
  display: table-cell;
  text-align: left;
}
.label {
  font-weight: bold;
  padding-right: 10px;
  text-align: right;
}
</style>
