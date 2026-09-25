import React from 'react'

import { BottomDrawer } from '../modals/bottomDrawer'
import { LinkInput } from './LinkInput'
import { WheelPicker } from './WheelPicker'
import { View } from '../structure/View'

// Options wheel behind a LinkInput: { value, label, icon?, color? } like WheelPicker.
// The selected option's icon/color show as the input prefix.
export function WheelInput({ value, onChange, options, snapPoints = [275], ...props }) {
  const [open, setOpen] = React.useState(false)
  const selected = options?.find((option) => option.value === value)

  return (
    <>
      <LinkInput value={selected?.label ?? ''} onPress={() => setOpen(true)} {...props} />
      <BottomDrawer open={open} onClose={() => setOpen(false)} snapPoints={snapPoints} contentProps={{ padding: 'md' }}>
        <View row centerV>
          <View flex>
            <WheelPicker options={options} value={value ?? null} onChange={onChange} />
          </View>
        </View>
      </BottomDrawer>
    </>
  )
}
