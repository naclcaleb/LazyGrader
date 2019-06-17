<template>
  <div class="footer">
    {{ text }}
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
.footer {
  font-style: italic;
  font-weight: lighter;
  font-size: x-small;
  position: fixed;
  bottom: 5px;
  width: 100%
}
</style>
