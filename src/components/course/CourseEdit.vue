<template>
  <div>
    <h1>Edit Course</h1>
    <div v-if="course == null" class="loading">Loading...</div>
    <course-form v-else :course="course"/>
  </div>
</template>

<script>
import CourseForm from './CourseForm'
import {mapGetters} from 'vuex'

export default {
  name: 'CourseEdit',
  components: {CourseForm},
  props: ['id'],
  data () {
    return {
      course: null
    }
  },
  computed: {
    ...mapGetters({
      find_course: 'course/find'
    })
  },
  methods: {
    update: function () {
      this.course = this.find_course(this.id)
      console.log('Course: ', this.course)
    }
  },
  mounted () {
    this.update()
  }
}
</script>

<style scoped>

</style>
