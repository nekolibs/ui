import { clearProps } from './_helpers'

export function useCursorModifier([values, props]) {
  let { pointer, cursor, move, ...restProps } = props

  if (pointer === true) cursor = 'pointer'
  if (move === true) cursor = 'move'

  const style = clearProps({ cursor })

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
