import { clearProps } from './_helpers'

export function useFlexModifier(props) {
  let { flex } = props

  if (flex === true) flex = 1

  const style = clearProps({ flex })

  return {
    ...props,
    style: {
      ...props.style,
      ...style,
    },
  }
}
