import { omit, keys } from 'ramda'

import { DEFAULT_DARK_THEME } from '../default/darkTheme'

const SCALE = keys(DEFAULT_DARK_THEME.colors)

export function getColorFromProps({ color, ...props }, defaultValue) {
  if (!!color) return [color, props]
  color = SCALE.find((key) => !!props[key]) || defaultValue
  return [color, omit(SCALE, props)]
}
