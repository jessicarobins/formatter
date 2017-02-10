<template>
  <md-layout md-align="center" md-gutter>
    <md-layout md-flex="50">
      <md-input-container>
        <label>Textarea</label>
        <md-textarea></md-textarea>
      </md-input-container>
      <md-button class="md-raised md-primary">Submit</md-button>
    </md-layout>
  </md-layout>
</template>

<script>
export default {
  name: 'test-form',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App'
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #42b983;
}
</style>
