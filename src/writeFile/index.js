import { importTemplates } from '../constants/template'
import format from '../format'
import { fileTemplate, templateVars } from '../constants/template'

export function transformFile(file, extension) {
  const values = {
    [templateVars[0]]: format[templateVars[0]]({
      dependencies: extractImports(file, extension),
      type: extension,
    }),
    [templateVars[1]]: 'svg',
  }
  let varsCounter = 0
  let resString = ''
  for (let i = 0; i < fileTemplate.length; i++) {
    if (fileTemplate[i] !== null) {
      resString = resString.concat(fileTemplate[i])
    } else if (templateVars[varsCounter] === 'transformedSvg') {
      resString = resString.concat(values[templateVars[varsCounter]])
      varsCounter++
    } else if (templateVars[varsCounter]) {
      resString = resString.concat(values[templateVars[varsCounter]])
      varsCounter++
    }
  }
  console.log(resString)
}

function extractImports(file, extension) {
  const template = importTemplates[extension]
  const variables = []
  if (!template) {
    console.error(`import type ${extension} is not listed in importTemplates`)
    return variables
  }
  for (let i = 0; i < Object.keys(template.items).length; i++) {
    const key = Object.keys(template.items)[i]
    const regString = `<${key}`
    const regExp = new RegExp(regString, 'gm')
    if (regExp.test(file)) {
      variables.push(key)
    }
  }
  return variables
}
