import _reduce from 'lodash/reduce'
import _findIndex from 'lodash/findIndex'

import format from '../format'
import { fileTemplate, templateVars } from '../constants/template'
import Ast from './Ast'

export function transformFile(file) {
  const svgAst = processSvg(file)
  console.log(JSON.stringify(svgAst))
  const values = {
    [templateVars[0]]: format[templateVars[0]]({
      dependencies: svgAst.general.imports,
    }),
    [templateVars[1]]: 'svgPart',
  }
  const tabs = getTabs(_findIndex(templateVars, el => el === 'transformedSvg'))
  let varsCounter = 0
  let resString = ''
  for (let i = 0; i < fileTemplate.length; i++) {
    if (fileTemplate[i] !== null) {
      resString = `${resString}${fileTemplate[i]}`
    } else if (templateVars[varsCounter] === 'transformedSvg') {
      resString = `${resString}${values[templateVars[varsCounter]]}`
      varsCounter++
    } else if (templateVars[varsCounter]) {
      resString = `${resString}${values[templateVars[varsCounter]]}`
      varsCounter++
    }
  }
  // console.log(resString)
}

function getTabs(varIndex) {
  if (varIndex === -1) {
    return ''
  }
  const placeIndex = _reduce(
    fileTemplate,
    (acc, el, index) => el === null
      ? [...acc, index]
      : acc,
    [],
  )[varIndex]
  return placeIndex === 0
    ? ''
    : `${/^\t*/gm.exec(fileTemplate[placeIndex - 1])[0]}\t`
}

function processSvg(file) {
  let svgPart = removeHeader(file)
  const svgArray = svgPart.split(/(?=<)(?!<\/style)|(?=\/>)/)
  const SvgAst = new Ast(svgArray)
  SvgAst.createAst()
  return SvgAst.svgAst
}

function removeHeader(file) {
  return /(?<=^.*)<svg[\s\S]*/gm.exec(file)[0]
}
