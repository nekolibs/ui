import { clearProps, flattenStyle } from './_helpers'
import { useGetColor, useGetRadius, useTheme } from '../theme/ThemeHandler'

function resolveBorderWidth(value, theme) {
  const base = theme.baseBorderWidth ?? 1
  if (value === 'overlayDivider') return theme.useOverlayDivider ? base : 0
  if (value === true) return base
  return value
}

export function useBorderModifier([values, props]) {
  const getRadius = useGetRadius()
  const getColor = useGetColor()
  const theme = useTheme()
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

  if (!!round) br = 1000

  const borderTopRightRadius = getRadius(brT ?? borderRadiusT ?? brR ?? borderRadiusR ?? borderRadius ?? br)
  const borderTopLeftRadius = getRadius(brT ?? borderRadiusT ?? brL ?? borderRadiusL ?? borderRadius ?? br)
  const borderBottomRightRadius = getRadius(brB ?? borderRadiusB ?? brR ?? borderRadiusR ?? borderRadius ?? br)
  const borderBottomLeftRadius = getRadius(brB ?? borderRadiusB ?? brL ?? borderRadiusL ?? borderRadius ?? br)

  borderStyle = borderStyle

  border = resolveBorderWidth(border, theme)
  borderT = resolveBorderWidth(borderT, theme)
  borderR = resolveBorderWidth(borderR, theme)
  borderB = resolveBorderWidth(borderB, theme)
  borderL = resolveBorderWidth(borderL, theme)
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
        ...flattenStyle(props.style),
        ...style,
      },
    },
  ]
}
