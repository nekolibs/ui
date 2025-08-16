import { clearProps } from './_helpers'
import { useGetSpace } from '../theme/ThemeHandler'

export function usePaddingModifier([values, props]) {
  const getSpace = useGetSpace()
  const { paddingT, paddingB, paddingL, paddingR, paddingV, paddingH, padding, ...restProps } = props

  const paddingTop = getSpace(paddingT ?? paddingV ?? padding)
  const paddingBottom = getSpace(paddingB ?? paddingV ?? padding)
  const paddingRight = getSpace(paddingR ?? paddingH ?? padding)
  const paddingLeft = getSpace(paddingL ?? paddingH ?? padding)

  const style = clearProps({ paddingTop, paddingBottom, paddingRight, paddingLeft })

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
