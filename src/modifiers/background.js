import { is } from 'ramda'

import { clearProps } from './_helpers'
import { useGetColor } from '../theme/ThemeHandler'

export function useBackgroundModifier([values, props]) {
  const getColor = useGetColor()
  let { bg, colors, background, backgroundColor, ...restProps } = props
  let gradientColors = []

  if (is(Array, bg) || !!colors?.length) {
    colors = colors || bg || []
    gradientColors = colors.map(getColor)
    const angle = restProps.angle || 45
    background = `linear-gradient(${angle}deg, ${gradientColors.join(', ')})`
  } else {
    backgroundColor = getColor(bg ?? background ?? backgroundColor)
  }

  const pointerEvents = props.pointerEvents

  const style = clearProps({ background, backgroundColor, pointerEvents })

  return [
    { gradientColors, ...values },
    {
      ...restProps,
      style: {
        ...props.style,
        ...style,
      },
    },
  ]
}
