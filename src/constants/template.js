import svgItems, { defaultExport as svgDefaultExport } from '../constants/rnSvgItems'

export const fileTemplate = [
  'import React from \'react\'\n\r',
  null,
  '\n\r',
  'import defaultType from \'./Icon.types\'\n\r',
  '\n\r',
  'const ORIGINAL_WIDTH = {{{original_width}}}\n\r',
  '\n\r',
  'const icon = (props) => {\n\r',
  '\tconst {\n\r',
  '\t\twidth\n\r',
  '\t\theight\n\r',
  '\t\tfill\n\r',
  '\t} = props\n\r',
  '\n\r',
  '\tconst scale = width / ORIGINAL_WIDTH\n\r',
  '\n\r',
  '\treturn (\n\r',
  null,
  '\t)\n\r',
  '}\n\r',
  '\n\r',
  'icon.propTypes = defaultType\n\r',
  '\n\r',
  'export default icon\n\r',
]

export const templateVars = [
  'imports',
  'transformedSvg'
]

export const importTemplates = {
  svg: {
    value: 'import var:packageString from \'react-native-svg\'\r\n',
    items: svgItems,
    defaultExport: svgDefaultExport,
  }
}
