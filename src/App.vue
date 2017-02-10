<template>
  <div id="app">
    <div class='container'>
      <test-form>
      </test-form>
    </div>
  </div>
</template>

<script>
import TestForm from './components/Form'

export default {
  name: 'app',
  components: {
    TestForm
  }
}
</script>

<style>
#app {
  margin-top: 60px;
  
}
</style>
