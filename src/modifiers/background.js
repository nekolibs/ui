import { clearProps } from './_helpers'
import { useGetColor } from '../theme/ThemeHandler'

export function useBackgroundModifier([values, props]) {
  const getColor = useGetColor()
  let { bg, background, backgroundColor, ...restProps } = props

  backgroundColor = getColor(bg ?? background ?? backgroundColor)
  const pointerEvents = props.pointerEvents

  const style = clearProps({ backgroundColor, pointerEvents })

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
