import { clearProps } from './_helpers'

export function useAnimationModifier([values, props]) {
  let { transition, ...restProps } = props

  const style = clearProps({ transition })

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
