<template>
  <md-textarea v-model="text"></md-textarea>
</template>

<script>

import tabOverride from 'taboverride'

export default {
  name: 'tabbable-box',
  props: ['text'],
  mounted: function () {
    console.log('text is: ' + this.text)
    // tabOverride.set(this.$el)
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
