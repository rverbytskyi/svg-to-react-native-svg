import _findIndex from 'lodash/findIndex'

import { importTemplate as template } from '../constants/template'
import replaceVar from '../utils/replaceVar'

export default function ({ dependencies }) {
  let packageString = ''

  const defaultExportIndex = _findIndex(dependencies, el => template.items[el] === template.defaultExport)

  if (defaultExportIndex !== -1) {
    packageString = template.defaultExport
  }

  if (defaultExportIndex !== -1 && dependencies.length === 1) {
    return replaceVar(template.value, { packageString })
  }

  const maxInlineExports = defaultExportIndex !== -1 ? 4 : 3

  let inlineExport = dependencies.length <= maxInlineExports

  if (defaultExportIndex !== -1) {
    packageString = inlineExport
      ? packageString.concat(', {')
      : packageString.concat(', {\r\n')
  } else {
    packageString = inlineExport
      ? '{'
      : '{\r\n'
  }

  for (let i = 0; i < dependencies.length; i++) {
    if (i !== defaultExportIndex) {
      const pack = inlineExport
        ? ` ${template.items[dependencies[i]]}${i !== dependencies.length - 1 ? ',' : ' }'}`
        : `\t${template.items[dependencies[i]]}${i !== dependencies.length - 1 ? ',\r\n' : ',\r\n}'}`
      packageString = packageString.concat(pack)
    }
  }
  return replaceVar(template.value, { packageString })
}
