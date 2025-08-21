import { clearProps } from './_helpers'

export function useDisplayModifier([values, props]) {
  let { cursor, opacity, hidden, display, inline, ...restProps } = props

  if (!!hidden) display = 'hidden'
  if (!!inline) display = 'inline'

  const style = clearProps({ display, opacity, cursor })

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
