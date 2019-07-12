<template>
  <div>
    <div v-if="!hideOnly">
      <div v-if="!loaded">Loading</div>
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
export default {
  name: 'AuthorizedAdminDiv',
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
