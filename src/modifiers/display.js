import { clearProps } from './_helpers'

export function useDisplayModifier([values, props]) {
  let { cursor, opacity, disabled, hidden, display, ...restProps } = props

  if (!!hidden) display = 'hidden'
  if (!!disabled) {
    opacity = opacity || 0.4
    cursor = 'not-allowed'
  }

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
