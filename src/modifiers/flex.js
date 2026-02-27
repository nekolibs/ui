import { clearProps, flattenStyle } from './_helpers'

export function useFlexModifier([values, props]) {
  let { flex, ...restProps } = props

  if (flex === true) flex = 1

  const style = clearProps({ flex, minWidth: 0 })

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
