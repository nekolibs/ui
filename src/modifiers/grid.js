import { useGetSpace } from '../theme/ThemeHandler'

export function useGridModifier([values, props]) {
  const getSpace = useGetSpace()

  let { gap, gapV, gapH, ...restProps } = props

  gap = getSpace(gap)
  gapV = getSpace(gapV)
  gapH = getSpace(gapH)
  let childPaddingV, childPaddingH
  if (gap || gapV) childPaddingV = (gapV ?? gap) / 2
  if (gap || gapH) childPaddingH = (gapH ?? gap) / 2

  const childPaddingProps = { paddingV: childPaddingV, paddingH: childPaddingH }

  return [
    { ...values, gap, childPaddingProps },
    {
      row: true,
      wrap: true,
      marginV: -childPaddingV,
      marginH: -childPaddingH,
      ...restProps,
    },
  ]
}
