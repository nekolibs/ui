import { omit, keys } from 'ramda'

import { DEFAULT_DARK_THEME } from '../default/darkTheme'

const EXCLUDED_KEYS = ['shadow', 'transparent']
const SCALE = keys(DEFAULT_DARK_THEME.colors).filter((k) => !EXCLUDED_KEYS.includes(k))

export function getColorFromProps({ color, ...props }, defaultValue) {
  if (!!color) return [color, props]
  color = SCALE.find((key) => !!props[key]) || defaultValue
  return [color, omit(SCALE, props)]
}
