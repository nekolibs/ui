import { Menu } from '../actions'
import { SegmentedPicker } from '../inputs'
import { useTabs } from './TabsHandler'

export function TabsMenu(props) {
  const { activeKey, items, onChange } = useTabs()

  return <Menu items={items} activeKey={activeKey} onChange={({ key }) => onChange(key)} {...props} />
}

export function TabsSegmentedMenu(props) {
  const { activeKey, items, onChange } = useTabs()

  return <SegmentedPicker options={items} valueKey="key" value={activeKey} onChange={onChange} {...props} />
}
