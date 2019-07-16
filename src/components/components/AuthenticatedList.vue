<template>
  <li v-if="authenticated">
    <slot></slot>
  </li>
</template>

<script>
import {mapState} from 'vuex'

export default {
  name: 'AuthenticatedItem',
  computed: {
    ...mapState({
      authenticated: state => state.user.authenticated
    })
  }
}
</script>
