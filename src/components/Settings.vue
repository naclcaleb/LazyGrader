<template>
  <div id="settings">
    <h1>Settings</h1>
    <form @submit.prevent="handleSubmit">
      <table>
        <tr>
          <td>
            <label for="siteTitle"><b>Website Title</b></label>
            <br>
            <input type="text" id="siteTitle" :placeholder="siteTitle" v-bind:value="settings.title"/>
          </td>
        </tr>
        <tr>
          <td>
            <label for="collegeName"><b>College Name</b></label>
            <br>
            <input type="text" id="collegeName" :placeholder="collegeName" :value="settings.college_name"/>
          </td>
        </tr>
        <tr>
          <td>
            <label for="backendHost"><b>Backend Hostname</b></label>
            <br>
            <input type="text" id="backendHost" :placeholder="backendHost" :value="settings.backend_host"/>
          </td>
        </tr>
        <tr>
          <td>
            <label for="canvasUrl"><b>Canvas URL</b></label>
            <br>
            <input type="text" id="canvasUrl" :placeholder="CanvasURL" :value="settings.canvas_url"/>
          </td>
        </tr>
        <tr>
          <td>
            <label for="jenkinsUrl"><b>Jenkins URL</b></label>
            <br>
            <input type="text" id="jenkinsUrl" :placeholder="JenkinsURL" :value="settings.jenkins_url"/>
          </td>
        </tr>
        <tr>
          <td>
            <label for="uploadSecrets"><b>Upload Secrets</b></label>
            <br>
            <input type="file" id="uploadSecrets">
          </td>
        </tr>
        <tr>
          <td>
            <input type="submit" id="submit">
            <input type="reset" id="cancel" v-on:click="cancelSubmit" value="Cancel">
          </td>
        </tr>
      </table>
    </form>
  </div>
</template>

<script>
import {mapGetters, mapActions} from 'Vuex'
export default {
  name: 'Settings',
  data () {
    return {
      siteTitle: '',
      collegeName: '',
      backendHost: '',
      CanvasURL: '',
      JenkinsURL: '',
      uploadSecrets: null
    }
  },
  computed: {
    ...mapGetters({
      settings: 'settings/settings'
    })
  },
  methods: {
    ...mapActions({
      fetch: 'settings/fetch'
    }),
    handleSubmit: function () {
      this.$notify({
        group: 'settings',
        title: 'Edit Complete',
        text: 'Changes saved'

      })
    },
    cancelSubmit: function () {
      this.$notify({
        group: 'settings',
        type: 'warn',
        title: 'Edit Cancelled',
        text: 'No changes saved'

      })
    }
  },
  mounted () {
    this.fetch().then(response => {
      console.log(response)
    })
  }
}
</script>

<style scoped>
  table{
    margin:auto;
    text-align: left;
  }
  table tr td input{
    margin-bottom:5px;
    padding: 5px;
  }
  #uploadSecrets{
    padding:0;
  }
  #submit, #cancel{
    padding:2px;
  }
  #submit{
    margin-right: 20px;
  }
</style>
