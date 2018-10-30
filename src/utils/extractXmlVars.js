import _reduce from 'lodash/reduce'

export function extractVars(str) {
  const cleanStr = str.replace(/<\w*\s?|>|\/>/gm, '')
  const variables = cleanStr.split(/(?<= +)(?=[a-zA-Z]+=")/gm)
  return _reduce(variables, (acc, el) => {
    const varName = (/[\w-]*(?==)/gm.exec(el) || [])[0]
    const value = (/(?<=")[\w\s.:\/,-]*(?=")/gm.exec(el) || [])[0]
    if (!varName) {
      return acc
    }
    return {
      ...acc,
      [varName]: value,
    }
  }, {})
}

export function getVars({ allVars, neededVars, svgToRnSvgVars }) {
  const vars = {}
  for (const varName in neededVars) {
    const rnSvgVarName = neededVars[varName]
    if (svgToRnSvgVars.hasOwnProperty(varName)) {
      const value = allVars[varName] ? svgToRnSvgVars[varName](allVars[varName]) : allVars[varName]
      if (value) {
        vars[rnSvgVarName] = value
      }
    } else {
      console.error(`svgToRnSvgVars has no property ${varName}`)
    }
  }
}
