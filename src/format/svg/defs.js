import { extractVars, getVars } from '../../utils/extractXmlVars'
import { postProcessColors } from './helpers'

const neededVars = {
  class: 'class',
  style: 'style',
  externalResourcesRequired: 'externalResourcesRequired',
  transform: 'transform',
}

const svgToRnSvgVars = {
  class: str => str,
  style: str => str,
  externalResourcesRequired: str => str,
  transform: str => str,
}

export default function ({ tagWithAttributes, tag, styles }) {
  const allVars = extractVars({ tagWithAttributes, tag, styles })
  return postProcessColors(getVars({ allVars, neededVars, svgToRnSvgVars }))
}
