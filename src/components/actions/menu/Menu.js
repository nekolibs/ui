import { HorizontalMenu } from './HorizontalMenu'
import { VerticalMenu } from './VerticalMenu'

export function Menu({ vertical, ...props }) {
  if (!!vertical) return <VerticalMenu {...props} />
  return <HorizontalMenu {...props} />
}
