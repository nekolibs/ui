import { Platform } from '../abstractions/Platform'
import { clearProps } from './_helpers'

export function usePositionModifier([values, props]) {
  let {
    position,
    absolute,
    absoluteFill,
    fixedFill,
    relative,
    fixed,
    sticky,
    top,
    bottom,
    left,
    right,
    zIndex,
    ...restProps
  } = props

  if (!zIndex && !!absolute) zIndex = 10
  if (absolute || absoluteFill) position = 'absolute'
  if (relative) position = 'relative'
  if (fixed || fixedFill) position = 'fixed'
  if (sticky) position = 'sticky'

  if (absoluteFill || fixedFill) {
    top = 0
    bottom = 0
    left = 0
    right = 0
  }

  if (Platform.OS !== 'web' && ['fixed', 'sticky'].includes(position)) {
    position = 'absolute'
  }

  const style = clearProps({ position, top, bottom, left, right, zIndex })

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
