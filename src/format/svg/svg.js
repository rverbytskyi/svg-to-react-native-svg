export default function (str) {
  const cleanStr = str.replace(/<\w*\s|>|\/>/gm, '')
  const variables = cleanStr.split(/(?<=\s)(?=[a-zA-Z])/gm)
  const parsedVars = variables.map((el) => {
    const varName = /[\w-]*(?==)/gm.exec(el)[0]
    const value = /(?<=")[\w\s.:\/,-]*(?=")/gm.exec(el)[0]
    return { [varName]: value }
  })
  return parsedVars
}
