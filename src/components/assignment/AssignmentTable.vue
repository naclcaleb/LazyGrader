<template>
  <div class="assignments-table">
    <b-table small :items="assignments" :fields="fields">
      <template slot="name" slot-scope="data">
        <router-link :to="{name: 'assignment', params: {id: data.item.id}}">
          {{data.value}}
        </router-link>
      </template>

      <template slot="due_date" slot-scope="data">
        {{data.value | formatDate}}
      </template>

      <template slot="open_date" slot-scope="data">
        {{data.value | formatDate}}
      </template>

      <template slot="close_date" slot-scope="data">
        {{data.value | formatDate}}
      </template>

      <template slot="invitation_url" slot-scope="data">
        <a :href="data.value">GitHub Classroom</a>
      </template>
    </b-table>
  </div>
</template>

<script>
export default {
  name: 'AssignmentTable',
  data () {
    return {
      fields: {
        name: {},
        due_date: {},
        open_date: {},
        close_date: {},
        invitation_url: {
          label: 'Invitation'
        }
      }
    }
  },
  props: {
    assignments: Array
  }
}
</script>

<style scoped>
.assignments-table {
  margin: auto;
}
</style>
