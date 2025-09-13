import { curry } from 'ramda'

import { clearProps } from './_helpers'

export const useApplyStyles = curry((customStyle, [values, { style, ...props }]) => {
  return [values, { ...props, style: { ...style, ...clearProps(customStyle) } }]
})
