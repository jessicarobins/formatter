import Vue from 'vue'
import * as _ from 'lodash'

export default {
  
  spaces(s) {
    const a = {
      tabs: '\t',
      2: '  ', 
      4: '    '
    }
    return a[s]
  },
  
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
    line = _.replace(line, /[ ]{2}/g, '-')
    line = _.replace(line, /\t/g, '-')
        
    const resultArray = line.match(regex)
    const tabs = resultArray[1]
    const description = resultArray[2]
    
    const specDepth = tabs.length ? tabs.length : 0
        
    let spec = {
      description: description,
      children: []
    }
    
    if(specDepth === 0){
      json.push(spec)
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
  
  exportSpecs(specs, spaces) {
    let response = "\n"
    const spaceDelimiter = this.spaces(spaces)
    
    specs.forEach( (spec) => {
      response += this.exportLine(spec, spaceDelimiter)
    })
    
    return response;
  },
  
  exportLine(spec, spaces, response="", depth=0) {
    
    response += this.indentToDepth(depth, spaces)
    
    if (spec.children.length) {
      
      response += `describe('${spec.description}', function() {\n\n`
      
      spec.children.forEach( (child) => {
        response = this.exportLine(
          child,
          spaces,
          response,
          depth + 1)
      })
                
    }
    else {
      response += `it('${spec.description}', function(){\n\n`
      
      response += this.indentToDepth(depth, spaces)
      
      response += "});\n\n"
      return response
    }       
    
    response += this.indentToDepth(depth, spaces)     
    
    response += "});\n\n"
        
    return response
    
  },
  
  indentToDepth(depth, spaces) {
    return _.repeat(spaces, depth);
  }
}