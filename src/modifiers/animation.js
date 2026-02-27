import { clearProps, flattenStyle } from './_helpers'

export function useAnimationModifier([values, props]) {
  let { transition, ...restProps } = props

  const style = clearProps({ transition })

  return [
    values,
    {
      ...restProps,
      style: {
        ...flattenStyle(props.style),
        ...style,
      },
    },
  ]
}
