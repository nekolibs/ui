import { pipe } from 'ramda'

import { ContentLabel } from './ContentLabel'
import { Icon } from './Icon'
import { useThemeComponentModifier } from '../../modifiers/themeComponent'

export function IconLabel(rootProps) {
  const [_, formattedProps] = pipe(
    useThemeComponentModifier('IconLabel') //
  )([{}, rootProps])

  const { icon, color, size = 'md', iconProps, ...props } = formattedProps

  return (
    <ContentLabel
      className="neko-icon-label"
      color={color}
      size={size}
      content={!!icon && <Icon name={icon} size={size} color={color} {...iconProps} />}
      {...props}
    />
  )
}

export const IconText = IconLabel
