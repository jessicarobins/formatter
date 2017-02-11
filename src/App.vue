<template>
  <div id="app">
    <app-header></app-header>
    <div class='container'>
      <test-form>
      </test-form>
    </div>
  </div>
</template>

<script>
import TestForm from './components/Form'
import AppHeader from './components/Header'

export default {
  name: 'app',
  components: {
    AppHeader,
    TestForm
  }
}
</script>

<style>
.container {
  margin-top: 40px;
}
</style>
