import { clearProps } from './_helpers'
import { mergePreset, useGetColor, useTexts } from '../theme/ThemeHandler'

export function useTextModifier({ size, ...props }) {
  const getColor = useGetColor()
  const texts = useTexts()

  if (!size && !props.inherit) size = 'p'

  let {
    color,
    opacity,
    bold,
    strong,
    fontWeight,
    weight,
    italic,
    underline,
    lineHeight,
    align,
    center,
    toRight,
    inherit,
    fontSize,
    ...restProps
  } = mergePreset(texts, size, props, 'p')

  let fontStyle
  if (italic) fontStyle = 'italic'

  let textDecorationLine
  if (underline) textDecorationLine = 'underline'

  let textAlign = align
  if (center) textAlign = 'center'
  if (toRight) textAlign = 'right'

  fontWeight = fontWeight || weight
  if (bold || strong) fontWeight = 600

  if (!inherit) color = getColor(color || 'text')

  const style = clearProps({
    fontWeight,
    fontStyle,
    textDecorationLine,
    lineHeight,
    textAlign,
    opacity,
    color,
    fontSize,
  })

  return {
    ...restProps,
    style: {
      ...props.style,
      ...style,
    },
  }
}
