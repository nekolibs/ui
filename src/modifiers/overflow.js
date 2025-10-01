import { clearProps } from './_helpers'

export function useOverflowModifier([values, props]) {
  let { hiddenOverflow, scroll, noScroll, scrollY, scrollX, overflow, overflowY, overflowX, ...restProps } = props

  if (hiddenOverflow) overflow = 'hidden'
  if (scroll) overflow = 'scroll'
  if (scrollY) overflowY = 'scroll'
  if (scrollX) overflowX = 'scroll'
  if (noScroll) {
    if (overflow === 'scroll') overflow = undefined
    if (overflowY === 'scroll') overflowY = undefined
    if (overflowX === 'scroll') overflowX = undefined
  }

  const style = clearProps({ overflow, overflowY, overflowX })

  return [
    values,
    {
      ...restProps,
      style: {
        ...props.style,
        ...style,
      },
    },
  ]
}
