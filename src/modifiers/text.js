import { clearProps } from './_helpers'

export function useTextModifier(props) {
  let { opacity, bold, strong, fontWeight, italic, underline, lineHeight, align, center, toRight } = props

  let fontStyle
  if (italic) fontStyle = 'italic'

  let textDecorationLine
  if (underline) textDecorationLine = 'underline'

  let textAlign = align
  if (center) textAlign = 'center'
  if (toRight) textAlign = 'right'

  if (bold || strong) fontWeight = 600

  const style = clearProps({
    fontWeight,
    fontStyle,
    textDecorationLine,
    lineHeight,
    textAlign,
    opacity,
  })

  // TODO: Handle font sizes based on theme

  return {
    ...props,
    style: {
      ...props.style,
      ...style,
    },
  }
}
