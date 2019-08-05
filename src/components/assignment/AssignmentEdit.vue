<template>
  <div class="centered">
    <div v-if="$store.state.user.user.role !== 'admin'">
      Only administrators can edit this resource
    </div>
    <authorized-div :role="'admin'">
      <AssignmentForm v-bind:assignment="assignment"></AssignmentForm>
    </authorized-div>
  </div>
</template>

<script>
import AssignmentForm from './AssignmentForm'
import AuthorizedDiv from '../components/AuthorizedDiv'
import {mapGetters} from 'vuex'

export default {
  name: 'AssignmentEdit',
  components: {AuthorizedDiv, AssignmentForm},
  props: ['id'],
  computed: {
    ...mapGetters({
      assignmentInfo: 'assignment/find'
    }),

    assignment: function () {
      return this.assignmentInfo(this.id)
    }
  },

  mounted () {
    if (!this.$store.state.assignment.loaded) {
      this.$store.dispatch('assignment/fetch')
    }
  }
}
</script>

<style scoped>
.centered {
  text-align: center;
}
</style>
