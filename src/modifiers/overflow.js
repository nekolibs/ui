import { clearProps } from './_helpers'

export function useOverflowModifier([values, props]) {
  let { hiddenOverflow, scroll, overflow, ...restProps } = props

  if (hiddenOverflow) overflow = 'hidden'
  if (scroll) overflow = 'scroll'

  const style = clearProps({ overflow })

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
