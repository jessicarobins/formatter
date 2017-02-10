import Vue from 'vue'

export default {
  parse(text) {
    return this.parseLine(text.split('\n'));
  },
  
  parseLine(
    textArray,
    parent_id=null,
    depth=0,
    previous=null,
    errorCount=0,
    specCount=0) {
      
    return textArray;
  }
}