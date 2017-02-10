import Vue from 'vue'
import * as _ from 'lodash'

export default {
  parse(text) {
    const textArray = text.split('\n')
    return this.parseLine(textArray);
  },
  
  parseLine(
    textArray,
    json=[],
    parent=null,
    depth=0,
    previous=null) {
    
    const regex = /(-*)([^-#]+)\s?(.*)/
    
    if (textArray.length < 1) {
      return json
    }
        
    let line = textArray[0]
    //this is where we turn spaces and tabs into -s
    line = line.replace(/[ ]{2}/, '-')
    line = line.replace(/\t/, '-')
        
    const resultArray = line.match(regex)
    const tabs = resultArray[1]
    const description = resultArray[2]
    
    const specDepth = tabs.length ? tabs.length : 0
        
    let spec = {
      description: description,
      children: []
    }
    
    if(depth === 0){
      if(parent) {
        parent.children.push(spec)
        spec.parent = parent
      }
      else {
        json.push(spec)
      }
    }
    else {
      if(depth === specDepth) {
        parent = previous ? previous.parent : undefined
        spec.parent = parent
        if (parent) {
          parent.children.push(spec)
        }
      }
      else if(specDepth > depth) {
        previous.children.push(spec)
        spec.parent = previous
      }
      // specDepth < depth
      else {
        for(let i=0; i < (depth-specDepth); i++) {
          previous = previous.parent
        }
        parent = previous.parent
        spec.parent = parent
        if (parent) {
          parent.children.push(spec)
        }
      }
    }
            
    textArray = _.tail(textArray)
        
    this.parseLine(   
        textArray,
        json,
        parent,
        specDepth, 
        spec,
        parent)
  }
}