<template>
  <div id="loading">
    <b-spinner></b-spinner>
    <p id="text">Loading...</p>
  </div>
</template>

<script>
export default {
  name: 'LoadingSpinner'
}
</script>

<style scoped>
img{
  max-width: 100%;
  height: 40px;
}

#loading {
  margin-top: 25px;
  text-align: center;
}

  #text{
    text-align: center;
  }
</style>
