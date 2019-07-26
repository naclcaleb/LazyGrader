<template>
  <authorized-div :role="'admin'">
    <label for="bulkUpload"></label>
    <input id="bulkUpload" type="file" accept=".csv, .yml">
    <br>
    <button v-on:click="handleSubmit">Upload</button>
  </authorized-div>
</template>

<script>
import AuthorizedDiv from './AuthorizedDiv'
import Papa from 'papaparse'

export default {
  name: 'BulkUpload',
  components: {AuthorizedDiv},
  methods: {
    handleSubmit: function () {
      const file = document.getElementById('bulkUpload').files[0]
      const fileName = document.getElementById('bulkUpload').value
      const fileExtension = fileName.replace(/^.*\./, '')
      const config = {
        delimiter: '', // auto-detect
        newline: '', // auto-detect
        quoteChar: '"',
        escapeChar: '"',
        header: false,
        transformHeader: undefined,
        dynamicTyping: false,
        preview: 0,
        encoding: '',
        worker: false,
        comments: false,
        step: undefined,
        complete: function (results, file) {
          console.log('Parsed: ', results, file)
        },
        error: function (err) {
          if (err) {
            console.log(err)
          }
        },
        download: false,
        downloadRequestHeaders: undefined,
        skipEmptyLines: false,
        chunk: undefined,
        fastMode: undefined,
        beforeFirstChunk: undefined,
        withCredentials: undefined,
        transform: undefined,
        delimitersToGuess: [',', '\t', '|', ';', Papa.RECORD_SEP, Papa.UNIT_SEP]
      }
      if (!file) {
        console.log('Error, please specify a file')
        return
        // TODO show notification and catch error
      }
      if (fileExtension === 'csv') {
        Papa.parse(file, config)
      } else if (fileExtension === 'yml') {
        // TODO parse yaml files
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
