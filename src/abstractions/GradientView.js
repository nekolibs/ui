import { AbsView } from './View'

export const AbsGradientView = ({ colors, style, ...props }) => {
  return <AbsView {...props} style={{ ...style }} />
}
