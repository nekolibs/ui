import { BottomDrawer } from '../structure'
import { ScrollView } from '../list/ScrollView'
import { ThemePicker } from './ThemePicker'

export function ThemePickerDrawer({ open, onClose, onChange }) {
  return (
    <BottomDrawer open={open} onClose={onClose} maxWidth={550} snapPoints={['50%', '85%']}>
      <ScrollView padding="md">
        <ThemePicker onChange={onChange} />
      </ScrollView>
    </BottomDrawer>
  )
}
