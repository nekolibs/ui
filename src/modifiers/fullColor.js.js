import tinycolor from 'tinycolor2'

import { useGetColor } from '../theme/ThemeHandler'

export function useFullColorModifier(props) {
  const getColor = useGetColor()
  let { color, outline, ...restProps } = props

  let bg = color
  const bgObj = tinycolor(getColor(bg))
  let borderColor = color
  let textColor = 'text'
  let textColorObj = tinycolor(getColor('text'))

  if (!!outline) {
    bg = 'transparent'
    textColor = color
  } else if (bgObj.isDark() === textColorObj.isDark()) {
    textColor = 'overlayBG'
  }

  return [
    textColor,
    {
      ...restProps,
      bg,
      borderColor,
    },
  ]
}
