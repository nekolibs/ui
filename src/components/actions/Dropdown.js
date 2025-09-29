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
    placement,
    gap,
    ...props
  } = formattedProps

  return (
    <View className="neko-dropdown" {...props}>
      <Popover
        useParentMinWidth
        placement={placement || 'bottomLeft'}
        trigger={trigger}
        padding="xs"
        useBottomDrawer={{ native: true, sm: true, md: true }}
        bottomDrawerProps={{
          bg: 'mainBG',
          contentProps: { bg: 'overlayBG', br: 'lg', margin: 'md' },
        }}
        {...popoverProps}
        renderContent={({ onClose }) => {
          const handleChange = (...params) => {
            if (onChange) onChange(...params)
            onClose()
          }
          return (
            <Menu
              vertical
              items={items}
              onChange={handleChange}
              _linkPaddingV="lg"
              _linkProps={{ borderB: true, padding: 'lg', borderL: 0, brColor: 'divider' }}
            />
          )
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
              gap={gap}
              {...iconLabelProps}
            />
          </Link>
        )}
      </Popover>
    </View>
  )
}
