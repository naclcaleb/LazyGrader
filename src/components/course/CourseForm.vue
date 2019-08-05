<template>
  <div class="centered">
    <h2>{{course.course_info.long_name}}</h2>

    <form id="course-edit" @submit.prevent="handleSubmit">
      <table class="course-table">
        <tr class="course-row">
          <td>
            <label for="course-canvas_id"><b>Canvas ID:</b></label>
            <br>
            <input v-model.number="course.canvas_id" id="course-canvas_id">
          </td>
        </tr>
        <tr class="course-row">
          <td>
            <label for="course-crn"><b>CRN:</b></label>
          <br>
            <input v-model.number="course.crn" id="course-crn">
          </td>
        </tr>
        <tr class="course-row">
          <td>
            <label for="course-term"><b>Term:</b></label>
          <br>
            <input v-model="course.term" id="course-term">
          </td>
        </tr>
        <tr class="course-row">
          <td>
            <label for="course-course_info"><b>Instance of:</b></label>
            <br>
          <select id="course-course_info" v-model="selected">
            <option v-for="info in course_infos" :key="info.id" :value="info.id">
              {{info.short_name}} - {{info.long_name}}
            </option>
          </select>
        </td>
      </tr>
      <input type="submit" id="submit"/>
      <button @click="cancelSubmit">Cancel</button>
      </table>
    </form>
  </div>
</template>

<script>
import {mapActions} from 'vuex'

export default {
  name: 'CourseForm',
  data () {
    return {
      course_infos: [],
      selected: 0
    }
  },
  props: {
    course: Object
  },
  mounted () {
    this.selected = this.course.course_info_id
    this.fetch_course_infos()
      .then(response => {
        this.course_infos = response.data
      })
  },
  methods: {
    ...mapActions({
      fetch_course_infos: 'course/fetch_course_infos'
    }),
    handleSubmit: function () {
      this.course.course_info_id = this.selected
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
  table{
  margin:auto;
  text-align: left;
}
  table tr td input, table tr td select{
    margin-bottom:5px;
    padding: 5px;
  }
  #course-edit #submit, #course-edit button{
    padding: 2px;
  }
  #course-edit #submit{
    margin-right: 20px;
  }

  .centered {
    text-align: center;
  }
</style>
