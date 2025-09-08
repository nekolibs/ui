import tinycolor from 'tinycolor2'

export function getContrastColor(bg, options = ['#FFFFFF', '#666666'], tolerance = 2.5) {
  if (!options.length) return '#666666'

  return tinycolor.mostReadable(bg, options).toHexString()

  // const contrasts = options.map((color) => ({
  // color,
  // contrast: tinycolor.readability(bg, color),
  // }))

  // contrasts.sort((a, b) => b.contrast - a.contrast)

  // if (contrasts.length > 1 && Math.abs(contrasts[0].contrast - contrasts[1].contrast) < tolerance) {
  // return options[0]
  // }

  // return contrasts[0].color
}
