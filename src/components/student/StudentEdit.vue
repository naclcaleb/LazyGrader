<template>
  <div>
    <StudentForm v-bind:student="student"></StudentForm>
  </div>
</template>

<script>
import StudentForm from './StudentForm'
import lazy from '../../lib/vclazygrader'
export default {
  name: 'StudentEdit',
  components: {StudentForm},
  data () {
    return {
      student: null
    }
  },
  mounted () {
    lazy.get_student(this.$route.params.id, {success: function (response) {
      this.student = response.data
    }.bind(this)})
  }
}
</script>

<style scoped>
</style>
