import { clearProps } from './_helpers'
import { useGetColor } from '../theme/ThemeHandler'

export function useShadowModifier([values, props]) {
  const getColor = useGetColor()
  let { shadow, ...restProps } = props

  let boxShadow, shadowRadius, shadowOffset, shadowOpacity, shadowColor, elevation
  if (shadow === true) {
    shadow = getColor('shadow')
  } else if (!!shadow) {
    shadow = getColor(shadow)
  }
  if (!!shadow) {
    boxShadow = `0 1px 10px ${shadow}`
    shadowRadius = 10
    shadowOffset = { width: 0, height: 1 }
    shadowOpacity = 1
    elevation = 10
    shadowColor = shadow
  }

  const style = clearProps({ boxShadow, shadowRadius, shadowOffset, shadowOpacity, shadowColor, elevation })

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
