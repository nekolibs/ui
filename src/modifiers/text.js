import { clearProps } from './_helpers'
import { mergePreset } from '../theme/helpers/mergePreset'
import { useGetColor, useTexts } from '../theme/ThemeHandler'

export function useTextModifier([{ color, textCode, ...values }, { ...props }]) {
  const getColor = useGetColor()
  const texts = useTexts()

  if (!textCode && !props.inherit) textCode = 'p'

  let {
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
  } = mergePreset(texts, textCode, props, 'p')

  let fontStyle
  if (italic) fontStyle = 'italic'

  let textDecorationLine
  if (underline) textDecorationLine = 'underline'

  let textAlign = align
  if (center) textAlign = 'center'
  if (toRight) textAlign = 'right'

  fontWeight = fontWeight || weight
  if (bold || strong) fontWeight = 600

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
