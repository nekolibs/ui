import tinycolor from 'tinycolor2'

import { useGetColor } from '../theme/ThemeHandler'
import { useSmartColor } from '../theme/helpers/colorScale'

export function useFullColorModifier(props) {
  const getColor = useGetColor()
  // let { color, outline, ...restProps } = props

  if (props.green) {
    console.log('BEFORE', props)
  }
  const [color, { outline, ...restProps }] = useSmartColor(props, 'primary')

  if (props.green) {
    console.log('AFTER', props, color)
  }

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
