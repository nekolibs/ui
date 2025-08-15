import tinycolor from 'tinycolor2'

const variations = [10, 20, 30, 40, 50, 60, 70, 80, 90]

export function generateColorVariants(colors) {
  const isDark = tinycolor(colors?.overlayBG || colors?.bg).isDark()
  const result = {}

  Object.entries(colors).forEach(([key, value]) => {
    result[key] = value

    variations.forEach((amount) => {
      if (amount <= 60) {
        const lightenSignal = !isDark ? '-' : '+'
        const darkenSignal = isDark ? '-' : '+'
        result[`${key}${lightenSignal}${amount}`] = tinycolor(value).lighten(amount).toString()
        result[`${key}${darkenSignal}${amount}`] = tinycolor(value).darken(amount).toString()
      }

      result[`${key}_op${amount}`] = tinycolor(value)
        .setAlpha(amount / 100)
        .toString()
    })
  })

  return result
}

export function applyColorVariantsOnTheme(theme) {
  return { ...theme, colors: generateColorVariants(theme.colors) }
}
