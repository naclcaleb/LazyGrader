<template>
  <li v-if="authenticated && user && user.role == role">
    <slot></slot>
  </li>
</template>

<script>
import {mapState} from 'vuex'

export default {
  name: 'AuthorizedItem',

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
