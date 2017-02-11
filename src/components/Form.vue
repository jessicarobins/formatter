<template>
  <div>
    <div class="row justify-content-center">
      <div class="col-8 offset-2">
        <div v-if="response">
          <div class="text-right">
            <md-button @success="toast" class="md-raised md-primary" v-clipboard:copy="response">Copy</md-button>
          </div>
          <pre>
            {{response}}
          </pre>
        </div>
        <div>
          <textarea :placeholder="placeholder" ref="tabbable" rows='10' v-model="text"></textarea>
          <div class='buttons'>
            <md-button @click.native="clear">Clear All</md-button>
            <md-button :disabled="!text" @click.native="submit" class="md-raised md-primary">Submit</md-button>
          </div>
        </div>
      </div>
      <div class="col-2 align-self-end">
        <div class="options">
          <md-whiteframe md-elevation="2">
            <h3 class="md-subheading">Format</h3>
            <h3 class="md-caption">Javascript</h3>
            <md-radio v-model="format" id="jasmine" name="jasmine" md-value="jasmine">describe/it</md-radio>
            <h3 class="md-caption">Ruby</h3>
            <md-radio v-model="format" id="minitest" name="minitest" md-value="minitest">describe/it</md-radio>
            <md-radio v-model="format" id="shoulda" name="shoulda" md-value="shoulda">context/should</md-radio>
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
      text: '',
      placeholder: 'Type specs here\n\tAdd children by hitting tab\n'
    }
  },
  methods: {
    submit: function () {
      const json = ParsingService.parse(this.text)
      this.response = ParsingService.exportSpecs(json, this.spaces, this.format)
      localStorage.removeItem('ddescribe.text')
      if (this.$ga) {
        this.$ga.trackEvent('submit', 'click')
      }
    },
    toast: function() {
      this.$refs.snackbar.open();
    },
    clear: function() {
      this.response = ''
      this.text = ''
      localStorage.removeItem('ddescribe.text')
    }
  },
  created: function () {
    this.format = localStorage.getItem('ddescribe.format') || 'jasmine'
    this.spaces = localStorage.getItem('ddescribe.spaces') || 'tabs'
    this.text = localStorage.getItem('ddescribe.text') || ''
  },
  mounted: function () {
    tabOverride.set(this.$refs.tabbable)
  },
  watch: {
    text: function(val) {
      localStorage.setItem('ddescribe.text', val)
    },
    format: function(val) {
      localStorage.setItem('ddescribe.format', val)
      if (this.$ga) {
        this.$ga.trackEvent('format', 'change', val)
      }
    },
    spaces: function(val) {
      localStorage.setItem('ddescribe.spaces', this.spaces)
      if (this.$ga) {
        this.$ga.trackEvent('spaces', 'change', val)
      }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  textarea, pre {
    min-width: 500px;
    width: 100%;
  }
  
  textarea:focus {
    outline-color: #E91E63;
  }
  
  pre {
    margin: 0;
  }
  
  .options {
    width: 200px;
    margin-bottom: 54px;
  }
  
  .md-radio {
    display: flex;
  }
  
  .md-whiteframe {
    margin-bottom: 20px;
    padding: 20px;
  }
  
  .buttons {
    display: flex;
    justify-content: space-between;
  }
</style>
