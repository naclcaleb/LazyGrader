<template>
  <div id="settings">
    <h1>Settings</h1>
    <form @submit.prevent="handleSubmit">
      <table v-if="loaded">
        <tr>
          <td>
            <label for="siteTitle"><b>Website Title</b></label>
            <br>
            <input type="text" id="siteTitle" :placeholder="siteTitle" :value="settings.title"/>
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
            <input type="file" ref="uploadSecrets" @change="onSelect" id="uploadSecrets">
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
      siteTitle: '',
      collegeName: '',
      backendHost: '',
      CanvasURL: '',
      JenkinsURL: '',
      uploadSecrets: null,
      loaded: false
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
    handleSubmit: async function () {
      const formData = new FormData()
      formData.append('file', this.file)
      try {
        let response = await axios.post('http://localhost:3000/api/v1/settings/secrets', formData)
        console.log('File uploaded: ' + response)
      } catch (err) {
        console.log(err)
      }
      this.$notify({
        group: 'settings',
        title: 'Edit Complete',
        text: 'Changes saved'

      })
    },
    onSelect: function () {
      this.file = this.$refs.uploadSecrets.files[0]
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
