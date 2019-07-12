<template>
  <div>
    <div v-if="!loaded">Loading</div>
    <div v-else-if="!authenticated">Error. Unauthorized User.</div>
    <div v-else-if="role != 'student' && role != 'admin'">Error. You do not have student privileges.</div>
    <slot v-else></slot>
  </div>
</template>

<script>
export default {
  name: 'AuthorizedStudentDiv',
  props: {
    loaded: Boolean,
    authenticated: Boolean,
    role: String
  }
}
</script>

<style scoped>

</style>
