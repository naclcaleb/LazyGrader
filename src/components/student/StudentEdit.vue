<template>
  <div>
    <StudentForm v-bind:student="student"></StudentForm>
  </div>
</template>

<script>
import StudentForm from './StudentForm'
import {mapGetters} from 'vuex'
export default {
  name: 'StudentEdit',
  components: {StudentForm},
  props: ['id'],
  data () {
    return {
      student: null
    }
  },
  computed: {
    ...mapGetters({
      findStudent: 'student/find'
    })
  },
  mounted () {
    this.student = this.findStudent(this.id)
  }
}
</script>

<style scoped>
</style>
