<template>
  <div>
    <authorized-div :role="'admin'">
      <AssignmentForm v-bind:assignment="assignment"></AssignmentForm>
    </authorized-div>
  </div>
</template>

<script>
import AssignmentForm from './AssignmentForm'
import AuthorizedDiv from '../components/AuthorizedDiv'
import {mapGetters, mapActions, mapState} from 'vuex'

export default {
  name: 'AssignmentEdit',
  components: {AuthorizedDiv, AssignmentForm},
  data () {
    return {
      assignment: null
    }
  },
  computed: {
    ...mapState({
      authenticated: state => state.user.authenticated,
      role: state => state.user.user.role,
      loaded: state => state.assignment.loaded
    }),
    ...mapGetters({
      assignmentInfo: 'assignment/find'
    })
  },
  methods: {
    ...mapActions({
      fetch: 'assignment/fetch'
    }),
    update: function () {
      this.assignment = this.assignmentInfo(this.$route.params.id)
      this.loading = false
    }
  },
  mounted () {
    if (!this.loaded) {
      this.fetch()
        .then(response => {
          this.update()
        })
    } else {
      this.update()
    }
  }
}
</script>

<style scoped>

</style>
