<template>
  <div>
    <div v-if="!authenticated || user.role != role">
      <router-link :to="{name: 'login'}">Login</router-link>
    </div>
    <slot v-else></slot>
  </div>
</template>

<script>
import {mapState} from 'vuex'

export default {
  name: 'AuthorizedDiv',
  props: {
    role: String
  },
  computed: {
    ...mapState({
      authenticated: state => state.user.authenticated,
      user: state => state.user.user
    })
  }
}
</script>

<style scoped>

</style>
