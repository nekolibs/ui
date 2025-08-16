import tinycolor from 'tinycolor2'

import { useGetColor } from '../theme/ThemeHandler'

export function useFullColorModifier([{ color, ...values }, { outline, ...props }]) {
  const getColor = useGetColor()

  let bg = color
  const bgObj = tinycolor(getColor(bg))
  let borderColor = color
  let fontColor = 'text'
  let fontColorObj = tinycolor(getColor('text'))

  if (!!outline) {
    bg = 'transparent'
    fontColor = color
  } else if (bgObj.isDark() === fontColorObj.isDark()) {
    fontColor = 'overlayBG'
  }

  return [
    { ...values, fontColor },
    {
      ...props,
      bg,
      borderColor,
    },
  ]
}
