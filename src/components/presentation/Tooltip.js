import { pipe } from 'ramda'

import { IconLabel } from './IconLabel'
import { Popover } from '../structure/popover/Popover'
import { useColorConverter } from '../../modifiers/colorConverter'
import { useFullColorModifier } from '../../modifiers/fullColor'
import { useSizeConverter } from '../../modifiers/sizeConverter'
import { useThemeComponentModifier } from '../../modifiers/themeComponent'

export function Tooltip(rootProps) {
  const [{ loading, fontColor, sizeCode }, formattedProps] = pipe(
    useColorConverter('overlayBG'),
    useSizeConverter('text', 'md'),
    useThemeComponentModifier('Tooltip'),
    useFullColorModifier
  )([{}, rootProps])

  const { label, icon, textProps, iconProps, gap, invert, children, ...props } = formattedProps

  return (
    <Popover
      className="neko-tooltip"
      {...props}
      content={
        <IconLabel
          center
          color={fontColor}
          size={sizeCode}
          label={label}
          icon={icon}
          gap={gap}
          invert={invert}
          textProps={textProps}
          iconProps={iconProps}
          loading={loading}
        />
      }
    >
      {children}
    </Popover>
  )
}
