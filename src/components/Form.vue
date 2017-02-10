<template>
  <div>
    <div class="row" v-if="response">
      <div class="col-6 offset-2">
        <pre>
          {{response}}
        </pre>
      </div>
      <div class="col-4">
        <md-button @success="toast" class="md-raised md-primary" v-clipboard:copy="response">Copy</md-button>
        <md-button @click.native="clear" class="md-raised">Clear</md-button>
      </div>
    </div>
    <div class="row justify-content-center">
      <div class="col-6 offset-2">
        <textarea ref="tabbable" rows='10' v-model="text"></textarea>
      </div>
      <div class="col-4">
        <md-card>
          <md-card-content>
            <h3 class="md-subheading">Javascript</h3>
            <md-radio v-model="format" id="jasmine" name="jasmine" md-value="1">Jasmine</md-radio>
          </md-card-content>
        </md-card>
        <md-button @click.native="submit" class="md-raised md-primary">Submit</md-button>
      </div>
    </div>
    <md-snackbar md-position="top right" ref="snackbar">
      <span>Copied!</span>
    </md-snackbar>
  </div>
</template>

<script>
import ParsingService from '../services/ParsingService'
import tabOverride from 'taboverride'

export default {
  name: 'test-form',
  data () {
    return {
      format: '1',
      response: '',
      text: ''
    }
  },
  methods: {
    submit: function () {
      const json = ParsingService.parse(this.text)
      this.response = ParsingService.exportSpecs(json)
    },
    toast: function() {
      this.$refs.snackbar.open();
    },
    clear: function() {
      this.response = ''
      this.text = ''
    }
  },
  mounted: function () {
    tabOverride.set(this.$refs.tabbable)
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  textarea, pre {
    width: 500px;
  }
  
  .md-card {
    width: 200px;
  }
</style>
