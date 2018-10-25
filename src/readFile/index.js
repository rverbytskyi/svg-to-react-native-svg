import fs from 'fs'
import _reduce from 'lodash/reduce'
import { IMAGES_LOCATION } from '../constants/fs'

export function getFiles(additional) {
  const appendix = additional ? `/${additional}` : ''
  const rawFiles = fs.readdirSync(`${IMAGES_LOCATION}${appendix}`, 'utf8')
  return _reduce(rawFiles, (acc, el) => {
    if (/^.*\.svg$/g.test(el)) {
      return [...acc, `${additional || ''}/${el}`]
    }
    if (fs.lstatSync(`${IMAGES_LOCATION}${appendix}/${el}`).isDirectory()) {
      const nestedFiles = getFiles(`${additional || ''}/${el}`)
      return [...acc, ...nestedFiles]
    }
    return acc
  }, [])
}

export function readFile(path) {
  return fs.readFileSync(`${IMAGES_LOCATION}/${path}`, { encoding: 'utf8', flag: 'r' })
}
