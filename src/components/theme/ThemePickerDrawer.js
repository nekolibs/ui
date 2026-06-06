import { BottomDrawer, DrawerScrollView } from '../modals/bottomDrawer'
import { ThemePicker } from './ThemePicker'

export function ThemePickerDrawer({ open, onClose, onChange }) {
  return (
    <BottomDrawer open={open} onClose={onClose} maxWidth={550} snapPoints={['60%', '85%']} useSafeArea={false}>
      <DrawerScrollView padding="md">
        <ThemePicker onChange={onChange} />
      </DrawerScrollView>
    </BottomDrawer>
  )
}
