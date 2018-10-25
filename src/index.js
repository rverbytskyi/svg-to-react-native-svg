import { getFiles, readFile } from './readFile'
import { transformFile } from './writeFile'

const files = getFiles()

// const file = readFile(files[0])

// transformFile(file)

for (let i = 0; i < files.length; i++) {
  const file = readFile(files[i])
  const extension = /(?<=\.)\S*$/g.exec(files[i]) || []
  transformFile(file, extension[0])
}
