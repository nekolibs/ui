import { pipe } from 'ramda'

import { IconLabel } from '../presentation/IconLabel'
import { Link } from './Link'
import { Popover } from '../structure/popover/Popover'
import { Text } from '../text/Text'
import { View } from '../structure/View'
import { useThemeComponentModifier } from '../../modifiers/themeComponent'

export function Dropdown({ options, items, ...rootProps }) {
  const [_, formattedProps] = pipe(
    useThemeComponentModifier('Dropdown')
    // useColorConverter('primary'),
    // useSizeModifier, //
    // useFlexWrapperModifier,
    // useDisplayModifier,
    // useStateModifier,
    // usePositionModifier,
    // usePaddingModifier,
    // useMarginModifier,
    // useFlexModifier
  )([{}, rootProps])

  const { label, trigger = 'click', icon, strong, color, popoverProps, iconLabelProps, ...props } = formattedProps

  return (
    <View className="neko-dropdown" {...props}>
      <Popover
        className="neko-link"
        useParentMinWidth
        placement="bottomLeft"
        trigger={trigger}
        {...popoverProps}
        content={<Text>TODO TODO TODO TODO TODO TODO TODO TODO TODO TODO TODO TODO TODO TODO TODO TODO</Text>}
        content={<Text>TODO</Text>}
      >
        <Link>
          <IconLabel
            label={label || '---'}
            icon={icon || 'arrow-down-s-fill'}
            strong={strong}
            color={color}
            invert
            {...iconLabelProps}
          />
        </Link>
      </Popover>
    </View>
  )
}
