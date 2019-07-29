<template>
  <div>
    <h1>Edit Course</h1>
    <div v-if="this.$store.state.user.user.role !== 'admin'">
      Only administers can edit this resource
    </div>
    <div v-else-if="course == null" class="loading">Loading...</div>
    <course-form v-else :course="course"/>
  </div>
</template>

<script>
import CourseForm from './CourseForm'
import {mapGetters} from 'vuex'
import LoadingSpinner from '../components/LoadingSpinner'

export default {
  name: 'CourseEdit',
  props: ['id'],
  components: {LoadingSpinner, CourseForm},
  computed: {
    ...mapGetters({
      find_course: 'course/find'
    }),

    course: function () {
      return this.find_course(this.id)
    }
  }
}
</script>

<style scoped>

</style>
