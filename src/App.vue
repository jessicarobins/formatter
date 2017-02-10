<template>
  <div id="app">
    <test-form>
    </test-form>
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
