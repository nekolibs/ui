import { clearProps } from './_helpers'

export function useFlexWrapperModifier(props) {
  const { justify, align, center, centerV, centerH, toRight, toBottom, direction, row, wrap, gap } = props

  let justifyContent = justify
  let alignItems = align
  let flexDirection = direction
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
    justifyContent,
    alignItems,
    flexDirection,
    flexWrap,
    gap,
  })

  return {
    ...props,
    style: {
      ...props.style,
      ...style,
    },
  }
}
