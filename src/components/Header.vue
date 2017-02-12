<template>
  <div class="app-header">
    <h2 class="md-display-4">ddescribe</h2>
    <md-button @click.native="openDialog('help')" class="md-primary">What is this?</button>
    <md-dialog-alert
      :md-content-html="alert.content"
      md-ok-text="Cool"
      ref="help">
    </md-dialog-alert>
  </div>
</template>

<script>
export default {
  name: 'app-header',
  data () {
    return {
      alert: {
        content: `ddescribe solves a pretty simple, but mildly annoying problem: 
        sometimes you want to go from indentation-formatted test cases to test framework 
        code. Maybe a different team writes your test plans, or maybe you want 
        to brainstorm the whole plan out before implementing - whatever the 
        reason 
        <ol>
          <li>type/paste in test cases</li>
          <li>select framework</li>
          <li>submit</li>
          <li>save 5 min</li>
        </ol>`
      }
    }
  },
  methods: {
    openDialog(ref) {
      this.$refs[ref].open()
      if (this.$ga) {
        this.$ga.trackEvent('about', 'click')
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
