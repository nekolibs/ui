import { clearProps } from './_helpers'
import { useGetSpace } from '../theme/ThemeHandler'

export function useMarginModifier([values, props]) {
  const getSpace = useGetSpace()
  const { marginT, marginB, marginL, marginR, marginV, marginH, margin, ...restProps } = props

  const marginTop = getSpace(marginT ?? marginV ?? margin)
  const marginBottom = getSpace(marginB ?? marginV ?? margin)
  const marginRight = getSpace(marginR ?? marginH ?? margin)
  const marginLeft = getSpace(marginL ?? marginH ?? margin)

  const style = clearProps({ marginTop, marginBottom, marginRight, marginLeft })

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
