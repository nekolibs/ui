import { useResponsiveValue } from '../../helpers/responsive'

export function ResponsiveRender(props) {
  const value = useResponsiveValue(props) || props.df
  return typeof value === 'function' ? value() : value
}

export function HideOn({ children, ...props }) {
  const hide = useResponsiveValue(props)
  if (!!hide) return false
  return children
}

export function ShowOn({ children, ...props }) {
  const show = useResponsiveValue(props)
  if (!show) return false
  return children
}
