import _reduce from 'lodash/reduce'

export function extractVars({ tagWithAttributes, tag, styles }) {
  const {
    elements: styledElements = {},
    class: styledClasses = {},
    id: styledIds = {},
  } = styles
  const cleanStr = tagWithAttributes.replace(/<\w*\s?|>|\/>/gm, '')
  const variables = cleanStr.split(/(?<= +)(?=[a-zA-Z:]+=")/gm)
  const styleFromElement = styledElements[tag] ? { ...styledElements[tag] } : {}
  return _reduce(variables, (acc, el) => {
    const varName = (/[\w-]*(?==)/gm.exec(el) || [])[0]
    const value = (/(?<=")[\w\s.:\/,-]*(?=")/gm.exec(el) || [])[0]
    if (!varName) {
      return acc
    }
    const styleFromClass = varName === 'class'
      ? styledClasses[value]
        ? { ...styledClasses[value] }
        : {}
      : {}
    const styleFromId = varName === 'id'
      ? styledIds[value]
        ? { ...styledIds[value] }
        : {}
      : {}
    return {
      ...acc,
      ...styleFromClass,
      ...styleFromId,
      [varName]: value,
    }
  }, { ...styleFromElement })
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
  return vars
}

export function extractStyleVariables(str) {
  const cleanStr = str.replace(/<.*>|\/>|\s/gm, '')
  const cssElements = cleanStr.split(/(?<=})/gm)
  return _reduce(cssElements, (acc, el) => {
    const fullItemName = (/^.*(?={)/.exec(el) || [])[0]
    const itemName = fullItemName.replace(/^[.#]/gm, '')
    if (fullItemName && itemName) {
      let type
      switch (fullItemName[0]) {
        case '#': {
          type = 'id'
          break
        }
        case '.': {
          type = 'class'
          break
        }
        default:
          type = 'element'
      }
      const cssProps = (el.replace(/(^.*{)|(;})/gm, '') || '').split(/;/gm)
      const attributes = _reduce(cssProps, (attrAcc, cssProp) => {
        const keyValuePair = cssProp.split(/:/gm)
        if (keyValuePair.length === 2) {
          return {
            ...attrAcc,
            [keyValuePair[0]]: keyValuePair[1],
          }
        }
        return attrAcc
      }, {})
      return {
        ...acc,
        [type]: {
          ...acc[type],
          [itemName]: attributes,
        }
      }
    }
    return acc
  }, {})
}
