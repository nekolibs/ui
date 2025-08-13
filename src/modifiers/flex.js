import { clearProps } from './_helpers'

export function useFlexModifier(props) {
  let { flex, ...restProps } = props

  if (flex === true) flex = 1

  const style = clearProps({ flex })

  return {
    ...restProps,
    style: {
      ...props.style,
      ...style,
    },
  }
}
