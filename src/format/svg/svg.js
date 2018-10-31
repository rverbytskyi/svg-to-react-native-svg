import { extractVars, getVars } from '../../utils/extractXmlVars'

const neededVars = {
  height: 'height',
  width: 'width',
  id: 'id',
}

const svgToRnSvgVars = {
  height: str => (/^[\d.,]+/g.exec(str) || [])[0],
  width: str => (/^[\d.,]+/g.exec(str) || [])[0],
  id: str => str,
}

export default function ({ tagWithAttributes, tag, styles }) {
  const allVars = extractVars({ tagWithAttributes, tag, styles })
  return getVars({ allVars, neededVars, svgToRnSvgVars })
}
