import { extractVars, getVars } from '../../utils/extractXmlVars'
import { postProcessColors } from './helpers'

const neededVars = {
  height: 'height',
  width: 'width',
  id: 'id',
  d: 'd',
  fill: 'fill',
  stroke: 'stroke',
  'stroke-width': 'strokeWidth',
  'stroke-linecap': 'strokeLinecap',
  'fill-rule': 'fillRule',
  transform: 'transform',
}

const svgToRnSvgVars = {
  height: str => (/^[\d.,]+/g.exec(str) || [])[0],
  width: str => (/^[\d.,]+/g.exec(str) || [])[0],
  id : str => str,
  d: str => str.replace(/[\t\r\n]/gm, ''),
  fill: str => str,
  stroke: str => str,
  'stroke-width': str => str,
  'stroke-linecap': str => str,
  'fill-rule': str => str,
  transform: str => str,
}

export default function (tagWithAttributes) {
  const allVars = extractVars(tagWithAttributes)
  return postProcessColors(getVars({ allVars, neededVars, svgToRnSvgVars }))
}
