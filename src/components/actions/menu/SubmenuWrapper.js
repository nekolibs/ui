import { Dropdown } from '../Dropdown'
import { Icon } from '../../presentation/Icon'
import { View } from '../../structure/View'

export function SubmenuWrapper({ item, children, placement, hideIcon, ...props }) {
  if (!item.subItems?.length) return children

  return (
    <Dropdown popoverProps={{ placement: placement || 'rightTop' }} items={item.subItems} trigger="hover" {...props}>
      <View flex row gap="xxs" center fullH>
        {children}
        {!hideIcon && <Icon name="arrow-right-s-line" />}
      </View>
    </Dropdown>
  )
}
