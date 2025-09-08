const BASE_COLORS = [
  'text3',
  'blue',
  'yellow',
  'green',
  'purple',
  'orange',
  'cyan',
  'red',
  'navy',
  'indigo',
  'gray',
  'brown',
  'lylac',
  'pink',
]

const COLORS = [...BASE_COLORS, ...BASE_COLORS.map((c) => `${c}+10`), ...BASE_COLORS.map((c) => `${c}-10`)]

export function getDynamicColor(id) {
  let num
  if (typeof id === 'number') {
    num = id
  } else {
    num = String(id)
      .split('')
      .reduce((acc, char) => acc + char.charCodeAt(0), 0)
  }

  const index = num % COLORS.length
  return COLORS[index]
}
