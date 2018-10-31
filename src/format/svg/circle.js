import { extractVars, getVars } from '../../utils/extractXmlVars'
import { postProcessColors } from './helpers'

const neededVars = {
  id: 'id',
  fill: 'fill',
  opacity: 'opacity',
  cx: 'cx',
  cy: 'cy',
  r: 'r',
}

const svgToRnSvgVars = {
  id: str => str,
  fill: str => str,
  opacity: str => str,
  cx: str => str,
  cy: str => str,
  r: str => str,
}

export default function ({ tagWithAttributes, tag, styles }) {
  const allVars = extractVars({ tagWithAttributes, tag, styles })
  return postProcessColors(getVars({ allVars, neededVars, svgToRnSvgVars }))
}
