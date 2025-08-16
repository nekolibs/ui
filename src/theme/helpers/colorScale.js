import { omit, keys } from 'ramda'

import { DEFAULT_DARK_THEME } from '../default/darkTheme'
import { useGetColor } from '../ThemeHandler'

const SCALE = keys(DEFAULT_DARK_THEME.colors)

export function getColorFromProps({ color, ...props }, defaultValue) {
  if (!!color) return [color, props]
  color = SCALE.find((key) => !!props[key]) || defaultValue
  return [color, omit(SCALE, props)]
}

export function useSmartColor(props, defaultValue) {
  const getColor = useGetColor()
  const [color, formattedProps] = getColorFromProps(props, defaultValue)
  return [getColor(color), formattedProps]
}
