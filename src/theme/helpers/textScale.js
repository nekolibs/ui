import { omit } from 'ramda'

const SCALE = ['xxxs', 'xxs', 'xs', 'sm', 'p', 'h6', 'h5', 'h4', 'h3', 'h2', 'h1']

export function moveTextScale(value, unit = 1) {
  const index = SCALE.indexOf(value)
  if (!index) return value
  return SCALE[index + unit] || value
}

export function getTextFromProps({ size, ...props }, defaultValue) {
  // numeric size = raw fontSize (px), not a scale code
  if (typeof size === 'number') return [null, { ...props, fontSize: size }]
  if (!!size) return [size, props]
  size = SCALE.find((key) => !!props[key]) || defaultValue
  return [size, omit(SCALE, props)]
}
