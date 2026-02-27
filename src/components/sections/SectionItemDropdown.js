import { pipe } from 'ramda'

import { IconLabel } from '../presentation'
import { Link } from '../actions'
import { Menu } from '../actions/menu/Menu'
import { Popover } from '../structure/popover/Popover'
import { ScrollView } from '../list'
import { SectionItem } from './SectionItem'
import { useColorConverter } from '../../modifiers/colorConverter'
import { useDefaultModifier } from '../../modifiers/default'
import { useResponsiveValue } from '../../responsive'
import { useThemeComponentModifier } from '../../modifiers/themeComponent'

const DEFAULT_PROPS = {
  paddingV: 'sm',
  minH: 'md',
  icon: 'arrow-down-s-fill',
}

export function SectionItemDropdown({ children, value, valueLabel, items, onChange, ...rootProps }) {
  const [{ color }, formattedProps] = pipe(
    useColorConverter(),
    useThemeComponentModifier('SectionItemDropdown'),
    useDefaultModifier(DEFAULT_PROPS)
  )([{}, rootProps])

  let { icon, iconLabelProps, trigger = 'click', placement, popoverProps, useBottomDrawer, ...props } = formattedProps

  useBottomDrawer = useResponsiveValue(useBottomDrawer || { native: true, sm: true, md: true })

  return (
    <Popover
      useParentMinWidth
      placement={placement || 'bottomRight'}
      trigger={trigger}
      padding={0}
      contentProps={{ padding: 0 }}
      useBottomDrawer={useBottomDrawer}
      {...popoverProps}
      renderContent={({ onClose }) => {
        const handleChange = (...params) => {
          if (onChange) onChange(...params)
          onClose()
        }
        return (
          <ScrollView>
            <Menu
              vertical
              items={items}
              onChange={handleChange}
              linkPaddingH={useBottomDrawer ? 'md' : 'sm'}
              linkMinHeight={useBottomDrawer ? 'xl' : 'md'}
              withDivider={useBottomDrawer}
            />
          </ScrollView>
        )
      }}
    >
      <Link className="neko-section-item-dropdown">
        <SectionItem color={color} {...props}>
          {children || (
            <IconLabel gap={2} invert color={color} {...iconLabelProps} label={valueLabel || value} icon={icon} />
          )}
        </SectionItem>
      </Link>
    </Popover>
  )
}
