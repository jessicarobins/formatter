import Vue from 'vue'
import * as _ from 'lodash'

export default {
  parse(text) {
    const textArray = text.split('\n')
    const json = this.parseLine(textArray)
    return json;
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
    
    if(specDepth === 0){
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
        
    return this.parseLine(   
        textArray,
        json,
        parent,
        specDepth, 
        spec)
  },
  
  exportSpecs(specs) {
    let response = "\n"
        
    specs.forEach( (spec) => {
      response += this.exportLine(spec)
    })
    
    return response;
  },
  
  exportLine(spec, response="", depth=0) {
    
    response += this.indentToDepth(depth)
    
    if (spec.children.length) {
      
      response += `describe('${spec.description}', function() {\n\n`
      
      spec.children.forEach( (child) => {
        response = this.exportLine(
          child, 
          response,
          depth + 1)
      })
                
    }
    else {
      response += `it('${spec.description}', function(){\n\n`
      
      response += this.indentToDepth(depth)
      
      response += "});\n\n"
      return response
    }       
    
    response += this.indentToDepth(depth)     
    
    response += "});\n\n"
        
    return response
    
  },
  
  indentToDepth(depth) {
    return _.repeat('\t', depth);
  }
}