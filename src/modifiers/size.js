import { clearProps } from './_helpers'

export function useSizeModifier(props) {
  let { width, height, fullWidth, fullHeight, ...restProps } = props || {}
  if (fullWidth) width = '100%'
  if (fullHeight) height = '100%'

  const style = clearProps({ height, width })

  return {
    ...restProps,
    style: { ...props.style, ...style },
  }
}
