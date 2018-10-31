import { extractVars, getVars } from '../../utils/extractXmlVars'
import { postProcessColors } from './helpers'

const neededVars = {
  height: 'height',
  width: 'width',
  id: 'id',
  stroke: 'stroke',
  'stroke-width': 'strokeWidth',
  fill: 'fill',
  'fill-rule': 'fillRule',
  transform: 'transform',
}

const svgToRnSvgVars = {
  height: str => (/^[\d.,]+/g.exec(str) || [])[0],
  width: str => (/^[\d.,]+/g.exec(str) || [])[0],
  id: str => str,
  stroke: str => str,
  'stroke-width': str => str,
  fill: str => str,
  'fill-rule': str => str,
  transform: str => str,
}

export default function ({ tagWithAttributes, tag, styles }) {
  const allVars = extractVars({ tagWithAttributes, tag, styles })
  return postProcessColors(getVars({ allVars, neededVars, svgToRnSvgVars }))
}
