<template>
  <div class="footer">
    <footer>{{ text }}</footer>
  </div>
</template>

<script>
export default {
  name: 'VCFooter',
  data () {
    return {
      text: '© 2019 VC Lazy Grader'
    }
  }
}
</script>

<style scoped>
.footer footer{
  font-style: italic;
  font-weight: lighter;
  font-size: x-small;
  background-color:#FF6C0E;
  position:fixed;
  left:0;
  bottom:0;
  height:30px;
  width:100%;
}
</style>
