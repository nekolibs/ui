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
    borderWidth,
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

  if (!!borderColor || brColor) borderColor = getColor(brColor ?? borderColor)

  borderStyle = borderStyle
  if (!!borderWidth) borderStyle = 'solid'
  const style = clearProps({
    borderStyle,
    borderTopRightRadius,
    borderTopLeftRadius,
    borderBottomRightRadius,
    borderBottomLeftRadius,
    borderColor,
    borderWidth,
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
