import { clearProps } from './_helpers'
import { useGetColor, useGetRadius } from '../theme/ThemeHandler'

export function useBorderModifier([values, props]) {
  const getRadius = useGetRadius()
  const getColor = useGetColor()
  let {
    br,
    brT,
    borderRadiusT,
    brB,
    borderRadiusB,
    brL,
    borderRadiusL,
    brR,
    borderRadiusR,
    borderRadius,
    borderStyle,
    borderT,
    borderB,
    borderL,
    borderR,
    border,
    borderColor,
    brColor,
    round,
    ...restProps
  } = props

  if (round) br = 1000
  const borderTopRightRadius = getRadius(brT ?? borderRadiusT ?? brR ?? borderRadiusR ?? borderRadius ?? br)
  const borderTopLeftRadius = getRadius(brT ?? borderRadiusT ?? brL ?? borderRadiusL ?? borderRadius ?? br)
  const borderBottomRightRadius = getRadius(brB ?? borderRadiusB ?? brR ?? borderRadiusR ?? borderRadius ?? br)
  const borderBottomLeftRadius = getRadius(brB ?? borderRadiusB ?? brL ?? borderRadiusL ?? borderRadius ?? br)

  borderStyle = borderStyle

  if (border === true) border = 1
  const borderTopWidth = borderT || border || 0
  const borderBottomWidth = borderB || border || 0
  const borderLeftWidth = borderL || border || 0
  const borderRightWidth = borderR || border || 0
  const hasBorder = borderTopWidth || borderBottomWidth || borderLeftWidth || borderRightWidth

  if (!!hasBorder) {
    borderStyle = 'solid'
    if (!borderColor && !brColor) brColor = 'divider'
  }

  if (!!borderColor || !!brColor) borderColor = getColor(borderColor ?? brColor)

  const style = clearProps({
    borderStyle,
    borderTopRightRadius,
    borderTopLeftRadius,
    borderBottomRightRadius,
    borderBottomLeftRadius,
    borderColor,
    borderTopWidth,
    borderBottomWidth,
    borderLeftWidth,
    borderRightWidth,
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
