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
  
  language(l) {
    const a = {
      jasmine: {
        describe: _.template('describe("${description}", function() {\n\n'),
        it: _.template('it("${description}", function(){\n\n'),
        end: '});\n\n'
      },
      minitest: {
        describe: _.template('describe "${description}" do\n\n'),
        it: _.template('it "${description}" do\n\n'),
        end: 'end\n\n'
      },
      shoulda: {
        describe: _.template('context "${description}" do\n\n'),
        it: _.template('should "${description}" do\n\n'),
        end: 'end\n\n'
      }
    }
    return a[l]
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
    let specDepth = depth;
    let spec = previous;
    
    if(resultArray) {
      const tabs = resultArray[1]
      const description = resultArray[2]
      
      specDepth = tabs.length ? tabs.length : 0
          
      spec = {
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
    }
    
    textArray = _.tail(textArray)
        
    return this.parseLine(   
        textArray,
        json,
        parent,
        specDepth, 
        spec)
  },
  
  exportSpecs(specs, spaces, format) {
    let response = "\n"
    const spaceDelimiter = this.spaces(spaces)
    const language = this.language(format)
    
    specs.forEach( (spec) => {
      response += this.exportLine(spec, spaceDelimiter, language)
    })
    
    return response;
  },
  
  exportLine(spec, spaces, language, response="", depth=0) {
    
    response += this.indentToDepth(depth, spaces)
    
    if (spec.children.length) {
      
      response += language.describe({description: spec.description})
      
      spec.children.forEach( (child) => {
        response = this.exportLine(
          child,
          spaces,
          language,
          response,
          depth + 1)
      })
                
    }
    else {
      response += language.it({description: spec.description})
      
      response += this.indentToDepth(depth, spaces)
      
      response += language.end
      return response
    }       
    
    response += this.indentToDepth(depth, spaces)     
    
    response += language.end
        
    return response
    
  },
  
  indentToDepth(depth, spaces) {
    return _.repeat(spaces, depth);
  }
}