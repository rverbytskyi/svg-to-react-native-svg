import _findIndex from 'lodash/findIndex'
import { extractStyleVariables } from '../utils/extractXmlVars'

import format from '../format'

class Ast {
  constructor(array) {
    this.array = array
    this.ast = {
      general: {
        type: 'svg',
        imports: [],
        styles: {},
      },
      content: []
    }
    this.layers = []
    this.layerIndex = 0
    this.prepareGeneral()
  }

  getTag = (str) => {
    return (/^<?\/*\w*>?/.exec(str) || [''])[0]
  }

  getClearTag = (str) => {
    return (/(?<=^<)\w*(?=>?)/.exec(str) || [''])[0]
  }

  createAst = () => {
    for (let i = 0; i < this.array.length; i++) {
      const el = this.array[i]
      const rawTag = this.getTag(el)
      if (!rawTag) {
        continue
      }
      const tag = this.getClearTag(rawTag)
      if (tag === 'style') {
        continue
      }
      if (!this.layers[this.layerIndex]) {
        const formatTagAttributes = format[tag]
        let values = {}
        if (typeof formatTagAttributes === 'function') {
          values = formatTagAttributes({ tagWithAttributes: el, tag, styles: this.ast.general.styles })
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
        const formatTagAttributes = format[tag]
        let values = {}
        if (typeof formatTagAttributes === 'function') {
          values = formatTagAttributes({ tagWithAttributes: el, tag, styles: this.ast.general.styles })
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

  prepareGeneral = () => {
    for (let i = 0; i < this.array.length; i++) {
      const el = this.array[i]
      const rawTag = this.getTag(el)
      if (!rawTag) {
        continue
      }
      const tag = this.getClearTag(rawTag)
      if (!tag) {
        continue
      }
      if (tag !== 'style' && _findIndex(this.ast.general.imports, el => el === tag) === -1) {
        this.ast.general.imports.push(tag)
        continue
      }
      if (tag === 'style') {
        this.ast.general.styles = { ...this.ast.general.styles, ...extractStyleVariables(this.array[i]) }
      }
    }
  }

  get svgAst() {
    return this.ast
  }
}

export default Ast
