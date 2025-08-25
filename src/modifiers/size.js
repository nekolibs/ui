import { clearProps } from './_helpers'
import { useGetElementHeight } from '../theme/ThemeHandler'

export function useSizeModifier([values, props]) {
  const getHeight = useGetElementHeight()
  let {
    width,
    height,
    minH,
    minHeight,
    maxH,
    maxHeight,
    minWidth,
    minW,
    maxWidth,
    maxW,
    fullWidth,
    fullW,
    fullHeight,
    fullH,
    ratio,
    square,
    ...restProps
  } = props || {}

  minHeight = getHeight(minHeight || minH)
  minWidth = getHeight(minWidth || minW)

  maxHeight = getHeight(maxHeight || maxH)
  maxWidth = getHeight(maxWidth || maxW)

  height = getHeight(height)
  width = getHeight(width)

  if (fullWidth || fullW) width = '100%'
  if (fullHeight || fullH) height = '100%'

  let aspectRatio = ratio
  if (!!square) aspectRatio = 1

  const style = clearProps({ height, width, minHeight, minHeight, maxHeight, minWidth, maxWidth, aspectRatio })

  return [
    values,
    {
      ...restProps,
      style: { ...props.style, ...style },
    },
  ]
}
