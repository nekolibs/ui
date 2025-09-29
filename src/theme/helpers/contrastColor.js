import tinycolor from 'tinycolor2'

export function getContrastColor(bg, options = ['#FFFFFF', '#666666'], tolerance = 2.5) {
  if (!options.length) return '#666666'

  const contrasts = options.map((color) => ({
    color,
    contrast: tinycolor.readability(bg, color),
  }))

  contrasts.sort((a, b) => b.contrast - a.contrast)

  if (contrasts.length > 1 && Math.abs(contrasts[0].contrast - contrasts[1].contrast) < tolerance) {
    return options[0]
  }

  return contrasts[0].color
}

// export function getContrastColor(bg, options = ['#FFFFFF', '#666666'], tolerance = 2.5) {
// if (!options.length) return '#666666'

// return tinycolor.mostReadable(bg, options).toHexString()
// }

// export function getContrastColor(bg, options = ['#FFFFFF', '#666666'], tolerance = 2.5) {
// const background = tinycolor(bg)

// function scoreColor(color) {
// const c = tinycolor(color)
// const contrast = tinycolor.readability(background, c)
// const { h: bh, s: bs, l: bl } = background.toHsl()
// const { h, s, l } = c.toHsl()

// const hueDiff = Math.abs(bh - h)
// const harmony = hueDiff > 180 ? 360 - hueDiff : hueDiff

// return (
// (contrast > tolerance ? contrast * 2 : contrast) +
// (100 - harmony) / 10 +
// (s > 0.1 && s < 0.8 ? 2 : 0) +
// (l > 0.2 && l < 0.8 ? 1 : 0)
// )
// }

// let bestColor = options[0]
// let bestScore = scoreColor(bestColor)

// for (let i = 1; i < options.length; i++) {
// const score = scoreColor(options[i])
// if (score > bestScore) {
// bestColor = options[i]
// bestScore = score
// }
// }

// return bestColor
// }
