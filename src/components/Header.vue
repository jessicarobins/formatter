<template>
  <div class="app-header">
    <h2 class="md-display-4">ddescribe</h2>
  </div>
</template>

<script>
export default {
  name: 'app-header',
  data () {
    return {
      alert: {
        content: '<div>Type specs\n\tAdd children by hitting tab\n</div>'
      }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .app-header {
    text-align: center;
    margin-top: 40px;
  }
</style>
