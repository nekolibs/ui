import { clearProps, flattenStyle } from './_helpers'

export function useFlexModifier([values, props]) {
  let { flex, alignSelf, selfStretch, selfCenter, selfStart, selfEnd, ...restProps } = props

  if (flex === true) flex = 1

  if (selfStretch) alignSelf = 'stretch'
  if (selfCenter) alignSelf = 'center'
  if (selfStart) alignSelf = 'flex-start'
  if (selfEnd) alignSelf = 'flex-end'

  const flattenedStyle = flattenStyle(props.style) || {}

  // Default flex items to minWidth:0 so they can shrink — but never override an explicit
  // minWidth/minW the caller set (the size modifier already put it on the style).
  const minWidth = flattenedStyle.minWidth === undefined ? 0 : undefined
  const style = clearProps({ flex, minWidth, alignSelf })

  return [
    values,
    {
      ...restProps,
      style: {
        ...flattenedStyle,
        ...style,
      },
    },
  ]
}
