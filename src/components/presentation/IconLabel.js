import { pipe } from 'ramda'

import { ContentLabel } from './ContentLabel'
import { Icon } from './Icon'
import { useColorConverter } from '../../modifiers/colorConverter'
import { useSizeConverter } from '../../modifiers/sizeConverter'
import { useThemeComponentModifier } from '../../modifiers/themeComponent'

export function IconLabel(rootProps) {
  const [{ sizeCode, color }, formattedProps] = pipe(
    useColorConverter(),
    useSizeConverter('icons', 'md'),
    useThemeComponentModifier('IconLabel') //
  )([{}, rootProps])

  const { icon, iconProps, ...props } = formattedProps

  return (
    <ContentLabel
      className="neko-icon-label"
      color={color}
      size={sizeCode}
      content={!!icon && <Icon name={icon} size={sizeCode} color={color} {...iconProps} />}
      {...props}
    />
  )
}

export const IconText = IconLabel
