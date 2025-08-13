import { clearProps } from './_helpers'

export function usePaddingModifier(props) {
  const { paddingT, paddingB, paddingL, paddingR, paddingV, paddingH, padding, ...restProps } = props

  const paddingTop = paddingT ?? paddingV ?? padding
  const paddingBottom = paddingB ?? paddingV ?? padding
  const paddingRight = paddingR ?? paddingH ?? padding
  const paddingLeft = paddingL ?? paddingH ?? padding

  const style = clearProps({ paddingTop, paddingBottom, paddingRight, paddingLeft })

  return {
    ...restProps,
    style: {
      ...props.style,
      ...style,
    },
  }
}
