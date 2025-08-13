import { clearProps } from './_helpers'

export function usePositionModifier(props) {
  let { position, absolute, relative, top, bottom, left, right, ...restProps } = props

  if (absolute) position = 'absolute'
  if (relative) position = 'relative'

  const style = clearProps({ position, top, bottom, left, right })

  return {
    ...restProps,
    style: {
      ...props.style,
      ...style,
    },
  }
}
