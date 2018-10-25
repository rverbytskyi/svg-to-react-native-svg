export default function (str = '', values = {}) {
  if (/var:\S*/g.test(str)) {
    return str.replace(/var:\S*/g, (varPlaceholder) => {
      const pointer = varPlaceholder.replace(/var:/g, '')
      return values[pointer]
    })
  }
}
