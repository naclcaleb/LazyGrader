<template>
  <authorized-div :role="'admin'">
    <label for="bulkUpload">{{ label }}</label>
    <input id="bulkUpload" type="file" ref="bulkUpload" accept=".csv,.yml">
    <br>
    <button v-on:click="handleSubmit">Upload</button>
  </authorized-div>
</template>

<script>
import AuthorizedDiv from './AuthorizedDiv'
import Papa from 'papaparse'
import yaml from 'yaml'

export default {
  name: 'BulkUpload',
  components: {AuthorizedDiv},
  props: {
    resource_type: {
      type: String,
      default: 'student'
    },
    label: String
  },
  methods: {
    handleSubmit: function () {
      const file = this.$refs.bulkUpload.files[0]
      const fileName = this.$refs.bulkUpload.value
      const fileExtension = fileName.replace(/^.*\./, '')
      let reader = new FileReader()
      const config = {
        header: true,
        worker: true,
        skipEmptyLines: true,
        complete: function (results, file) {
          console.log('Parsed: ', results, file)
          console.log('resource type: ', this.resource_type)
          this.$store.dispatch(`${this.resource_type}/bulk`, {resources: results.data})
            .then(response => {
              console.log('new students: ', response)
            })
          this.$notify({
            group: 'auth',
            title: 'Bulk upload successful',
            text: 'File succesfully parsed and data will be uploaded to server'
          })
        }.bind(this),
        error: function (err) {
          if (err) {
            this.$notify({
              group: 'auth',
              title: 'Error',
              text: 'Unable to parse file: ' + err,
              type: 'err'
            })
            console.log(err)
          }
        }
      }
      if (!file) {
        console.log('Error, please specify a file')
        return
        // TODO show notification and catch error
      }
      if (fileExtension === 'csv') {
        Papa.parse(file, config)
      } else if (fileExtension === 'yml') {
        reader.onload = function (e) {
          let text = reader.result
          console.log(yaml.parse(text))
        }
        reader.readAsText(file)
      } else {
        console.log('Error, unsupported filetype')
        // TODO actually throw an error
      }
    }
  }
}
</script>

<style scoped>
  #bulkUpload {
    margin: auto;
  }
</style>
