import { clearProps } from './_helpers'
import { useGetSpace } from '../theme/ThemeHandler'

export function useFlexWrapperModifier([values, props]) {
  const getSpace = useGetSpace()
  let {
    justify,
    align,
    center,
    centerV,
    centerH,
    toRight,
    toBottom,
    toLeft,
    toTop,
    direction,
    row,
    wrap,
    gap,
    noGap,
    ...restProps
  } = props

  let flexDirection = direction || (row ? 'row' : 'column')
  let justifyContent = justify
  let alignItems = align
  let flexWrap

  gap = getSpace(gap)
  if (noGap) gap = undefined

  const isRow = flexDirection === 'row'
  const mainAxis = isRow ? 'horizontal' : 'vertical'
  const crossAxis = isRow ? 'vertical' : 'horizontal'

  if (center) {
    justifyContent = 'center'
    alignItems = 'center'
  } else {
    if (centerH) {
      if (mainAxis === 'horizontal') justifyContent = 'center'
      else alignItems = 'center'
    }
    if (centerV) {
      if (mainAxis === 'vertical') justifyContent = 'center'
      else alignItems = 'center'
    }
    if (toRight) {
      if (mainAxis === 'horizontal') justifyContent = 'flex-end'
      else alignItems = 'flex-end'
    }
    if (toLeft) {
      if (mainAxis === 'horizontal') justifyContent = 'flex-start'
      else alignItems = 'flex-start'
    }
    if (toBottom) {
      if (mainAxis === 'vertical') justifyContent = 'flex-end'
      else alignItems = 'flex-end'
    }
    if (toTop) {
      if (mainAxis === 'vertical') justifyContent = 'flex-start'
      else alignItems = 'flex-start'
    }
  }

  if (wrap) flexWrap = 'wrap'

  const style = clearProps({
    display: 'flex',
    justifyContent,
    alignItems,
    flexDirection,
    flexWrap,
    gap,
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
