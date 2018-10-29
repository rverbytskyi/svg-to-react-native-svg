import _findIndex from 'lodash/findIndex'

import format from '../format'

class Ast {
  constructor(array) {
    this.array = array
    this.ast = {
      info: {
        type: 'svg',
        imports: [],
      },
      content: []
    }
    this.layers = []
    this.layerIndex = 0
  }

  getTag = (str) => {
    return (/^<?\/*\w*>?/.exec(str) || [''])[0]
  }

  getClearTag = (str) => {
    const tag = (/(?<=^<)\w*(?=>?)/.exec(str) || [''])[0]
    if (tag && _findIndex(this.ast.info.imports, el => el === tag) === -1) {
      this.ast.info.imports.push(tag)
    }
    return tag
  }

  createAst = () => {
    for (let i = 0; i < this.array.length; i++) {
      const el = this.array[i]
      const rawTag = this.getTag(el)
      if (!rawTag) {
        continue
      }
      if (!this.layers[this.layerIndex]) {
        const tag = this.getClearTag(rawTag)
        const formatTagAttributes = format[tag]
        let values = {}
        if (typeof formatTagAttributes === 'function') {
          values = formatTagAttributes(el)
        }
        this.ast.content.push({
          tag,
          value: el,
          values,
          children: [],
        })
        this.layers.push(this.ast.content[this.ast.content.length - 1])
        continue
      }
      if (/(^<\/)|(^\/>)/.test(rawTag)) {
        this.layerIndex--
      } else {
        const tag = this.getClearTag(rawTag)
        const formatTagAttributes = format[tag]
        let values = {}
        if (typeof formatTagAttributes === 'function') {
          values = formatTagAttributes(el)
        }
        this.layers[this.layerIndex].children.push({
          tag,
          value: el,
          values,
          children: [],
        })
        const childrenWithAddedChild = this.layers[this.layerIndex].children
        this.layers.push(childrenWithAddedChild[childrenWithAddedChild.length - 1])
        this.layerIndex++
      }
    }
  }

  get svgAst() {
    return this.ast
  }
}

export default Ast
