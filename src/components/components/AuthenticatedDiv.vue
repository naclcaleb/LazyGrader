<template>
  <div>
    <div v-if="!authenticated">
      <router-link :to="{name: 'login'}">Login</router-link>
    </div>
    <slot v-else></slot>
  </div>
</template>

<script>
import {mapState} from 'vuex'

export default {
  name: 'AuthenticatedDiv',
  computed: {
    ...mapState({
      authenticated: state => state.user.authenticated
    })
  }
}
</script>

<style scoped>

</style>
