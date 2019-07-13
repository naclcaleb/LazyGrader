<template>
  <div id="edit">
    <h1>Edit Assignment</h1>
      <div id="edit-form">
        <table>
          <tr>
            <td>
              <label for="assignment-name"><b>Name: </b></label>
              <br>
              <input type="text" id="assignment-name" :placeholder="local_assignment.name" v-model="local_assignment.name" required>
            </td>
          </tr>
          <tr>
            <td>
              <label for="github-link"><b>GitHub Classroom Link: </b></label>
              <br>
              <input type="text" id="github-link" :placeholder="local_assignment.invitation_url" v-model="local_assignment.invitation_url" required>
            </td>
          </tr>
          <tr>
            <td>
              <label for="due-date"><b>Due Date: </b></label>
              <br>
              <input type="datetime-local" id="due-date" :placeholder="local_assignment.due_date" v-model="local_assignment.due_date" required>
            </td>
          </tr>
          <tr>
            <td>
              <label for="open-date"><b>Open Date: </b></label>
              <br>
              <input type="datetime-local" id="open-date" :placeholder="local_assignment.open_date" v-model="local_assignment.open_date" required>
            </td>
          </tr>
          <tr>
          <td>
            <label for="close-date"><b>Close Date: </b></label>
            <br>
            <input type="datetime-local" id="close-date" :placeholder="local_assignment.close_date" v-model="local_assignment.close_date" required>
          </td>
        </tr>
          <tr>
            <td>
              <label for="close-date"><b>Canvas ID: </b></label>
              <br>
              <input type="number" id="canvas-id" :placeholder="local_assignment.canvas_id" v-model="local_assignment.canvas_id" required>
            </td>
          </tr>
          <tr>
            <td>
              <input type="submit" id="submit" v-on:click="handleSubmit">
              <input type="reset" id="cancel" v-on:click="cancelSubmit" value="Cancel">
            </td>
          </tr>
        </table>
      </div>
  </div>
</template>

<script>
import {mapGetters, mapState, mapActions} from 'vuex'
import AuthorizedAdminDiv from '../components/AuthorizedAdminDiv'
export default {
  name: 'AssignmentForm',
  components: {AuthorizedAdminDiv},
  data () {
    return {
      local_assignment: null
    }
  },
  computed: {
    ...mapState({
      loaded: state => state.assignment.loaded
    }),
    ...mapGetters({
      assignmentInfo: 'assignment/find'
    })
  },
  methods: {
    ...mapActions({
      fetch: 'assignment/fetch',
      upload: 'assignment/upload'
    }),
    update: function () {
      this.local_assignment = this.assignmentInfo(this.$route.params.id)
    },
    handleSubmit: function () {
      if (this.local_assignment.name === '' || this.local_assignment.invitation_url === '' || this.local_assignment.open_date == null || this.local_assignment.close_date == null || this.local_assignment.due_date === '') {
        this.$notify({
          group: 'edit',
          type: 'warn',
          title: 'Data Required',
          text: 'Data required in all fields'
        })
      } else {
        this.upload(this.local_assignment)
          .then(response => {
            this.$router.push({name: 'assignment', params: {id: this.local_assignment.id}})
            this.$notify({
              group: 'edit',
              title: 'Edit Complete',
              text: 'Changes saved'
            })
          })
      }
    },
    cancelSubmit: function () {
      this.fetch()
        .then(response => {
          this.update()
        })
      this.$router.push({name: 'assignment', params: {id: this.local_assignment.id}})
      this.$notify({
        group: 'edit',
        type: 'warn',
        title: 'Edit Cancelled',
        text: 'No changes saved'
      })
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
  table{
    margin: auto;
    text-align: left;
  }
  table tr td input{
    margin-bottom: 5px;
    padding: 5px;
  }
  #submit, #cancel{
    padding: 2px;
  }
  #submit{
    margin-right: 20px;
  }
</style>
