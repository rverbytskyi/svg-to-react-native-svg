import svgItems, { defaultExport as svgDefaultExport } from '../constants/rnSvgItems'

export const fileTemplate = [
  'import React from \'react\'\r\n',
  null,
  '\r\n',
  'import defaultType from \'./Icon.types\'\r\n',
  '\r\n',
  'const ORIGINAL_WIDTH = {{{original_width}}}\r\n',
  '\r\n',
  'const icon = (props) => {\r\n',
  '\tconst {\r\n',
  '\t\twidth\r\n',
  '\t\theight\r\n',
  '\t\tfill\r\n',
  '\t} = props\r\n',
  '\r\n',
  '\tconst scale = width / ORIGINAL_WIDTH\r\n',
  '\r\n',
  '\treturn (\r\n',
  null,
  '\t)\r\n',
  '}\r\n',
  '\r\n',
  'icon.propTypes = defaultType\r\n',
  '\r\n',
  'export default icon\r\n',
]

export const templateVars = [
  'imports',
  'transformedSvg'
]

export const importTemplate = {
  value: 'import var:packageString from \'react-native-svg\'\r\n',
  items: svgItems,
  defaultExport: svgDefaultExport,
}
