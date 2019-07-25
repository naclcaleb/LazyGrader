<template>
  <div>
    <div v-if="!loaded"><loading-spinner></loading-spinner></div>
    <div v-else-if="!authenticated">Error. Unauthorized User.</div>
    <div v-else-if="role != 'student' && role != 'admin'">Error. You do not have student privileges.</div>
    <slot v-else></slot>
  </div>
</template>

<script>
import LoadingSpinner from './LoadingSpinner'
export default {
  name: 'AuthorizedStudentDiv',
  components: {LoadingSpinner},
  props: {
    loaded: Boolean,
    authenticated: Boolean,
    role: String
  }
}
</script>

<style scoped>

</style>
