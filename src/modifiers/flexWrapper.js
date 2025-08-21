import { clearProps } from './_helpers'
import { useGetSpace } from '../theme/ThemeHandler'

export function useFlexWrapperModifier([values, props]) {
  const getSpace = useGetSpace()
  let { justify, align, center, centerV, centerH, toRight, toBottom, direction, row, wrap, gap, noGap, ...restProps } =
    props

  let justifyContent = justify
  let alignItems = align
  let flexDirection = direction || 'column'
  let flexWrap
  gap = getSpace(gap)
  if (!!noGap) gap = undefined

  if (center) {
    justifyContent = 'center'
    alignItems = 'center'
  } else {
    if (centerH) justifyContent = 'center'
    if (toBottom) justifyContent = 'flex-end'
    if (centerV) alignItems = 'center'
    if (toRight) alignItems = 'flex-end'
  }

  if (row) flexDirection = 'row'
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
