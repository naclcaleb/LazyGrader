<template>
  <div>
    <AssignmentForm v-bind:assignment="assignment"></AssignmentForm>
  </div>
</template>

<script>
import AssignmentForm from './AssignmentForm'
import {mapGetters, mapActions} from 'vuex'
export default {
  name: 'AssignmentEdit',
  components: {AssignmentForm},
  data () {
    return {
      assignment: null
    }
  },
  computed: {
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
