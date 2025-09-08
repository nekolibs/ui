import { omit } from 'ramda'

const SCALE = ['xxxs', 'xxs', 'xs', 'sm', 'md', 'lg', 'xl', 'xxl', 'xxxl']

export function moveScale(value, unit = 1) {
  const index = SCALE.indexOf(value)
  if (!index) return value
  return SCALE[index + unit] || value
}

export function getSizeFromProps({ size, ...props }, defaultValue) {
  if (!!size) return [size, props]
  size = SCALE.find((key) => !!props[key]) || defaultValue
  return [size, omit(SCALE, props)]
}
