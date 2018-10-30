export function postProcessColors(vars) {
  const obj = Object.assign({}, vars)
  if (!obj.fill && !obj.stroke) {
    return obj
  }
  if (!obj.fill && obj.stroke) {
    obj.stroke = `fill || '${obj.stroke}'`
    return obj
  }
  if (obj.fill && !obj.stroke) {
    obj.fill = `fill || '${obj.fill}'`
    return obj
  }
  if (obj.fill === 'none' && obj.fill === obj.stroke) {
    return obj
  }
  if (obj.fill !== 'none' && obj.fill === obj.stroke) {
    obj.stroke = `fill || '${obj.stroke}'`
    obj.fill = `fill || '${obj.fill}'`
    return obj
  }
  if (obj.fill === 'none' && obj.stroke !== 'none') {
    obj.stroke = `fill || '${obj.stroke}'`
    return obj
  }
  if (obj.fill !== 'none' && obj.stroke === 'none') {
    obj.fill = `fill || '${obj.fill}'`
    return obj
  }
  if (obj.fill !== 'none' && obj.stroke !== 'none') {
    return obj
  }
}
