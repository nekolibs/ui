import { clearProps, flattenStyle } from './_helpers'

export function useFlexModifier([values, props]) {
  let { flex, alignSelf, selfStretch, selfCenter, selfStart, selfEnd, ...restProps } = props

  if (flex === true) flex = 1

  if (selfStretch) alignSelf = 'stretch'
  if (selfCenter) alignSelf = 'center'
  if (selfStart) alignSelf = 'flex-start'
  if (selfEnd) alignSelf = 'flex-end'

  const style = clearProps({ flex, minWidth: 0, alignSelf })

  return [
    values,
    {
      ...restProps,
      style: {
        ...flattenStyle(props.style),
        ...style,
      },
    },
  ]
}
