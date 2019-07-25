<template>
  <div id="loading">
    <img src="../../assets/loading.gif">
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
  #text{
    text-align: center;
  }
</style>
