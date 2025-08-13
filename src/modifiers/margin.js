import { clearProps } from './_helpers'

export function useMarginModifier(props) {
  const { marginT, marginB, marginL, marginR, marginV, marginH, margin, ...restProps } = props

  const marginTop = marginT ?? marginV ?? margin
  const marginBottom = marginB ?? marginV ?? margin
  const marginRight = marginR ?? marginH ?? margin
  const marginLeft = marginL ?? marginH ?? margin

  const style = clearProps({ marginTop, marginBottom, marginRight, marginLeft })

  return {
    ...restProps,
    style: {
      ...props.style,
      ...style,
    },
  }
}
