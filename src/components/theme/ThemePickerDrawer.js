import { BottomDrawer } from '../modals/bottomDrawer'
import { ThemePicker } from './ThemePicker'

export function ThemePickerDrawer({ open, onClose, onChange }) {
  return (
    <BottomDrawer open={open} onClose={onClose} maxWidth={550} snapPoints={['75%']} useSafeArea={false}>
      <ThemePicker onChange={onChange} />
    </BottomDrawer>
  )
}
