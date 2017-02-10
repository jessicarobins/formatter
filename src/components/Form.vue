<template>
  <div>
    <md-layout v-if="response" md-gutter md-align="center">
      <md-layout md-flex="50">
        <md-card>
          <md-card-content>
            <pre>
              {{response}}
            </pre>
          </md-card-content>
        </md-card>
      </md-layout>
    </md-layout>
    <md-layout md-gutter md-align="center">
      <md-layout md-flex="50">
        <md-input-container>
          <label>Textarea</label>
          <md-textarea v-model="text"></md-textarea>
        </md-input-container>
        <md-button @click.native="submit" class="md-raised md-primary">Submit</md-button>
      </md-layout>
      <md-layout md-flex="20">
        <md-card>
          <md-card-content>
            <h3 class="md-subheading">Javascript</h3>
            <md-radio v-model="format" id="jasmine" name="jasmine" md-value="1">Jasmine</md-radio>
          </md-card-content>
        </md-card>
      </md-layout>
    </md-layout>
  </div>
</template>

<script>
import ParsingService from '../services/ParsingService'

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
