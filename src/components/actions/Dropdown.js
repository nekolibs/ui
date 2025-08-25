import { pipe } from 'ramda'

import { IconLabel } from '../presentation/IconLabel'
import { Link } from './Link'
import { Menu } from './menu/Menu'
import { Popover } from '../structure/popover/Popover'
import { View } from '../structure/View'
import { useThemeComponentModifier } from '../../modifiers/themeComponent'

export function Dropdown({ items, ...rootProps }) {
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

  const {
    onChange,
    label,
    trigger = 'click',
    icon,
    strong,
    color,
    popoverProps,
    iconLabelProps,
    children,
    ...props
  } = formattedProps

  return (
    <View className="neko-dropdown" {...props}>
      <Popover
        useParentMinWidth
        placement="bottomLeft"
        trigger={trigger}
        padding="xsm"
        {...popoverProps}
        renderContent={({ onClose }) => {
          const handleChange = (...params) => {
            if (onChange) onChange(...params)
            onClose()
          }
          return <Menu vertical items={items} gap={0} onChange={handleChange} linkPaddingH="xsm" />
        }}
      >
        {children || (
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
        )}
      </Popover>
    </View>
  )
}
