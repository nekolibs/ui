import { omit } from 'ramda'

const SCALE = ['xxxsm', 'xxsm', 'xsm', 'sm', 'p', 'h6', 'h5', 'h4', 'h3', 'h2', 'h1']

export function moveTextScale(value, unit = 1) {
  const index = SCALE.indexOf(value)
  if (!index) return value
  return SCALE[index + unit] || value
}

export function getTextFromProps({ size, ...props }, defaultValue) {
  if (!!size) return [size, props]
  size = SCALE.find((key) => !!props[key]) || defaultValue
  return [size, omit(SCALE, props)]
}
