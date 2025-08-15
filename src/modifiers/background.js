import { clearProps } from './_helpers'
import { useGetColor } from '../theme/ThemeHandler'

export function useBackgroundModifier(props) {
  const getColor = useGetColor()
  let { bg, background, backgroundColor, ...restProps } = props

  backgroundColor = getColor(bg ?? background ?? backgroundColor)

  const style = clearProps({ backgroundColor })

  return {
    ...restProps,
    style: {
      ...props.style,
      ...style,
    },
  }
}
