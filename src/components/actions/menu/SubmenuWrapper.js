import { Dropdown } from '../Dropdown'
import { Icon } from '../../presentation/Icon'
import { View } from '../../structure/View'

export function SubmenuWrapper({ item, children, ...props }) {
  if (!item.subItems?.length) return children

  return (
    <Dropdown popoverProps={{ placement: 'rightTop' }} items={item.subItems} trigger="hover" {...props}>
      <View flex row gap="xxsm" center fullH>
        {children}
        <Icon name="arrow-right-s-line" />
      </View>
    </Dropdown>
  )
}
