import { pickBy } from 'ramda'

export const clearProps = pickBy((item) => item !== undefined)

export const flattenStyle = (style) =>
  Array.isArray(style) ? Object.assign({}, ...style) : style
