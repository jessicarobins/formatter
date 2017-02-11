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
        <div class='text-right'>
          <md-button @click.native="submit" class="md-raised md-primary">Submit</md-button>
        </div>
      </div>
      <div class="col-4">
        <div class="options">
          <md-whiteframe md-elevation="2">
            <h3 class="md-subheading">Format</h3>
            <h3 class="md-caption">Javascript</h3>
            <md-radio v-model="format" id="jasmine" name="jasmine" md-value="jasmine">Jasmine</md-radio>
            <h3 class="md-caption">Ruby</h3>
            <md-radio v-model="format" id="minitest" name="minitest" md-value="minitest">Minitest</md-radio>
            <md-radio v-model="format" id="shoulda" name="shoulda" md-value="shoulda">Shoulda</md-radio>
          </md-whiteframe>
          <md-whiteframe md-elevation="2">
            <h3 class="md-subheading">Spacing</h3>
            <md-radio v-model="spaces" id="tabs" name="tabs" md-value="tabs">Tabs</md-radio>
            <md-radio v-model="spaces" id="2spaces" name="2spaces" md-value="2">2 spaces</md-radio>
            <md-radio v-model="spaces" id="4spaces" name="4spaces" md-value="4">4 spaces</md-radio>
          </md-whiteframe>
        </div>
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
      spaces: 'tabs',
      format: 'jasmine',
      response: '',
      text: ''
    }
  },
  methods: {
    submit: function () {
      const json = ParsingService.parse(this.text)
      this.response = ParsingService.exportSpecs(json, this.spaces, this.format)
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
    min-width: 500px;
    width: 100%;
  }
  
  .options {
    width: 200px;
  }
  
  .md-radio {
    display: flex;
  }
  
  .md-whiteframe {
    margin-bottom: 20px;
    padding: 20px;
  }
</style>
