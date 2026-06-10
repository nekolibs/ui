import { is } from 'ramda'

export function fixedDecimals(num, count = 2) {
  if (!num) return num
  if (Number.isInteger(num)) return num
  if (is(String, num)) num = parseFloat(num)

  const decimalPart = num.toString().split('.')[1]
  if (decimalPart && decimalPart.length > count) {
    return parseFloat(num.toFixed(count))
  }
  return num
}
