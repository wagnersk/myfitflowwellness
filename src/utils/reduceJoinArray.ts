export function reduceJoinArray(arrayData?: string[]) {
  if (!arrayData) return
  const formattedArray = arrayData.reduce((acc, item, index) => {
    return acc + (index > 0 ? `, ` : '') + item
  }, '')

  return formattedArray
}
