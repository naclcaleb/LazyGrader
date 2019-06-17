<template>
  <div>
    <h1>Edit Course</h1>
    <div v-if="course == null" class="loading">Loading...</div>
    <course-form v-else v-bind:course="course"/>
  </div>
</template>

<script>
import CourseForm from './CourseForm'
import lazy from '../../lib/vclazygrader'

export default {
  name: 'CourseEdit',
  components: {CourseForm},
  data () {
    return {
      course: null
    }
  },
  mounted () {
    lazy.get_course(this.$route.params.id, {success: function (response) {
      this.course = response.data
    }.bind(this)})
  }
}
</script>

<style scoped>

</style>
