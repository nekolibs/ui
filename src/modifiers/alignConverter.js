export function useAlignConverter(defaultValue) {
  return ([values, props]) => {
    let align = props.align
    if (!align && props.center) align = 'center'
    if (!align && props.toRight) align = 'right'
    if (!align && props.toLeft) align = 'left'
    if (!align) align = defaultValue

    return [{ align }, { ...props, align }]
  }
}
