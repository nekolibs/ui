import tinycolor from 'tinycolor2'

import { getContrastColor } from '../theme/helpers/contrastColor'
import { useGetColor } from '../theme/ThemeHandler'

export function useFullColorModifier([{ color, ...values }, { outline, fill, ...props }]) {
  const getColor = useGetColor()

  let bg = color
  const bgObj = tinycolor(getColor(bg))
  let borderColor = color
  let fontColor = 'text'

  if (!!outline && fill !== true) {
    bg = 'transparent'
    fontColor = color
  } else {
    fontColor = getContrastColor(bgObj, [getColor('text'), getColor('overlayBG')])
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
