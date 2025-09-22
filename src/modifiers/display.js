import { clearProps } from './_helpers'

export function useDisplayModifier([values, props]) {
  let { opacity, hidden, display, inline, block, ...restProps } = props

  if (!!hidden) display = 'hidden'
  if (!!inline) display = 'inline'
  if (!!block) display = 'block'

  const style = clearProps({ display, opacity })

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
