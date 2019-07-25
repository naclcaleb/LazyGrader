<template>
  <div>
    <div v-if="!hideOnly">
      <div v-if="!loaded"><loading-spinner></loading-spinner></div>
      <div v-else-if="!authenticated">Error. Unauthorized User.</div>
      <div v-else-if="role != 'admin'">Error. You do not have admin privileges.</div>
      <slot v-else></slot>
    </div>
    <div v-else>
      <div v-if="!authenticated || role != 'admin'"></div>
      <slot v-else></slot>
    </div>
  </div>
</template>

<script>
import LoadingSpinner from './LoadingSpinner'
export default {
  name: 'AuthorizedAdminDiv',
  components: {LoadingSpinner},
  props: {
    loaded: Boolean,
    authenticated: Boolean,
    role: String,
    hideOnly: Boolean
  }
}
</script>

<style scoped>

</style>
