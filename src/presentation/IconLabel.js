import { ContentLabel } from './ContentLabel'
import { Icon } from './Icon'
import { useMergeThemeComponent } from '../theme/ThemeHandler'

export function IconLabel(rootProps) {
  const { icon, color, size = 'md', iconProps, ...props } = useMergeThemeComponent('IconLabel', rootProps)

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
