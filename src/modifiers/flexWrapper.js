import { clearProps } from './_helpers'

export function useFlexWrapperModifier(props) {
  const { justify, align, center, centerV, centerH, toRight, toBottom, direction, row, wrap, gap, ...restProps } = props

  let justifyContent = justify
  let alignItems = align
  let flexDirection = direction || 'column'
  let flexWrap

  if (center) {
    justifyContent = 'center'
    alignItems = 'center'
  } else {
    if (centerV) justifyContent = 'center'
    if (toBottom) justifyContent = 'flex-end'
    if (centerH) alignItems = 'center'
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

  return {
    ...restProps,
    style: {
      ...props.style,
      ...style,
    },
  }
}
