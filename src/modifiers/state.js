import { clearProps } from './_helpers'

export function useStateModifier([values, props]) {
  let { disabled, loading, onClick, onPress, onChange, ...restProps } = props

  let cursor = props.style
  let opacity = props.opacity

  if (!!disabled) {
    opacity = 0.3
    onChange = undefined
    cursor = 'not-allowed'
  }
  if (!!disabled || !!loading) {
    onPress = undefined
    onClick = undefined
  }

  const style = clearProps({ opacity, cursor })
  const newProps = clearProps({ onPress, onClick, onChange })

  return [
    { disabled, loading, ...values },
    {
      ...newProps,
      ...restProps,
      style: {
        ...props.style,
        ...style,
      },
    },
  ]
}
