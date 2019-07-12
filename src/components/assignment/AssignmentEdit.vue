<template>
  <div>
    <AuthorizedAdminDiv :loaded="loaded" :authenticated="authenticated" :role="role" :hide-only="false">
      <AssignmentForm v-bind:assignment="assignment"></AssignmentForm>
    </AuthorizedAdminDiv>
  </div>
</template>

<script>
import AssignmentForm from './AssignmentForm'
import {mapGetters, mapActions, mapState} from 'vuex'
import AuthorizedAdminDiv from '../components/AuthorizedAdminDiv'
export default {
  name: 'AssignmentEdit',
  components: {AssignmentForm, AuthorizedAdminDiv},
  data () {
    return {
      assignment: null
    }
  },
  computed: {
    ...mapState({
      authenticated: state => state.user.authenticated,
      role: state => state.user.user.role
    }),
    ...mapGetters({
      assignmentInfo: 'assignment/find',
      loaded: 'assignment/loaded'
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
