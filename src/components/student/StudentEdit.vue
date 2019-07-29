<template>
  <div>
    <div v-if="student == null">
      Students can only edit their own profile
    </div>
    <StudentForm v-else v-bind:student="student"></StudentForm>
  </div>
</template>

<script>
import StudentForm from './StudentForm'
import {mapActions, mapGetters} from 'vuex'
export default {
  name: 'StudentEdit',
  components: {StudentForm},
  props: ['id'],
  computed: {
    ...mapGetters({
      findStudent: 'student/find'
    }),

    student: function () {
      return this.findStudent(this.id)
    }
  },

  methods: {
    ...mapActions({
      fetch: 'student/fetch'
    })
  },

  mounted () {
    if (!this.$store.state.student.loaded) {
      this.fetch()
    }
  }
}
</script>

<style scoped>
</style>
