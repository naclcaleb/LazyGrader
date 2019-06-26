<template>
  <div id="settings">
    <h1>Settings</h1>
    <form @submit.prevent="handleSubmit">
      <table v-if="loaded">
        <tr>
          <td>
            <label for="siteTitle"><b>Website Title</b></label>
            <br>
            <input type="text" id="siteTitle" :placeholder="remote_settings.title" v-model="local_settings.title"/>
          </td>
        </tr>
        <tr>
          <td>
            <label for="collegeName"><b>College Name</b></label>
            <br>
            <input type="text" id="collegeName" :placeholder="remote_settings.college_name" v-model="local_settings.college_name"/>
          </td>
        </tr>
        <tr>
          <td>
            <label for="canvasUrl"><b>Canvas URL</b></label>
            <br>
            <input type="text" id="canvasUrl" :placeholder="remote_settings.canvas_url" v-model="local_settings.canvas_url"/>
          </td>
        </tr>
        <tr>
          <td>
            <label for="jenkinsUrl"><b>Jenkins URL</b></label>
            <br>
            <input type="text" id="jenkinsUrl" :placeholder="remote_settings.jenkins_url" v-model="local_settings.jenkins_url"/>
          </td>
        </tr>
        <tr>
          <td>
            <label><b>Upload Secrets</b></label>
            <br>
            <textarea v-model="local_settings.secrets"></textarea>
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
import {mapGetters, mapActions} from 'vuex'
export default {
  name: 'Settings',
  data () {
    return {
      local_settings: {
        title: '',
        college_name: '',
        canvas_url: '',
        jenkins_url: '',
        secrets: ''
      },
      loaded: false
    }
  },
  computed: {
    ...mapGetters({
      remote_settings: 'settings/settings'
    })
  },
  methods: {
    ...mapActions({
      fetch: 'settings/fetch',
      upload: 'settings/upload'
    }),

    handleSubmit: function () {
      console.log('Settings: ', this.local_settings)
      this.upload(this.local_settings)
        .then(response => {
          this.$notify({
            group: 'settings',
            title: 'Edit Complete',
            text: 'Changes saved'

          })
        })
        .catch(error => {
          console.log(error)
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
      this.loaded = true
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
