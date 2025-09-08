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

  // Calcula eixos
  const isRow = flexDirection === 'row'
  const mainAxis = isRow ? 'horizontal' : 'vertical'
  const crossAxis = isRow ? 'vertical' : 'horizontal'

  if (center) {
    justifyContent = 'center'
    alignItems = 'center'
  } else {
    // CenterH → sempre eixo horizontal
    if (centerH) {
      if (mainAxis === 'horizontal') justifyContent = 'center'
      else alignItems = 'center'
    }
    // CenterV → sempre eixo vertical
    if (centerV) {
      if (mainAxis === 'vertical') justifyContent = 'center'
      else alignItems = 'center'
    }
    // ToRight → sempre alinhamento à direita (eixo horizontal)
    if (toRight) {
      if (mainAxis === 'horizontal') justifyContent = 'flex-end'
      else alignItems = 'flex-end'
    }
    // ToLeft → sempre alinhamento à esquerda
    if (toLeft) {
      if (mainAxis === 'horizontal') justifyContent = 'flex-start'
      else alignItems = 'flex-start'
    }
    // ToBottom → sempre alinhamento ao fundo (eixo vertical)
    if (toBottom) {
      if (mainAxis === 'vertical') justifyContent = 'flex-end'
      else alignItems = 'flex-end'
    }
    // ToTop → sempre alinhamento no topo
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
