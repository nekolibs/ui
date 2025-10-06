import { pipe } from 'ramda'

import { IconLabel } from '../presentation/IconLabel'
import { Link } from './Link'
import { Menu } from './menu/Menu'
import { Popover } from '../structure/popover/Popover'
import { View } from '../structure/View'
import { useResponsiveValue } from '../../responsive'
import { useThemeComponentModifier } from '../../modifiers/themeComponent'

// TODO: Refactor to use default values
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

  let {
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
    useBottomDrawer,
    ...props
  } = formattedProps

  useBottomDrawer = useResponsiveValue(useBottomDrawer || { native: true, sm: true, md: true })

  return (
    <View className="neko-dropdown" {...props}>
      <Popover
        useParentMinWidth
        placement={placement || 'bottomLeft'}
        trigger={trigger}
        padding={0}
        // In case its web use the Drawer component
        contentProps={{ padding: 0 }}
        useBottomDrawer={useBottomDrawer}
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
              linkPaddingH={useBottomDrawer ? 'md' : 'sm'}
              linkMinHeight={useBottomDrawer ? 'xl' : 'md'}
              withDivider={useBottomDrawer}
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
