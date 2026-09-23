import React from 'react'

import { BottomDrawer } from '../modals/bottomDrawer'
import { DurationWheelPicker } from './DurationWheelPicker'
import { LinkInput } from './LinkInput'
import { View } from '../structure/View'

export function formatDuration(seconds) {
  if (seconds == null) return ''
  const h = Math.floor(seconds / 3600)
  const m = Math.floor((seconds % 3600) / 60)
  const s = seconds % 60
  const parts = [!!h && `${h}h`, !!m && `${m}m`, (!!s || (!h && !m)) && `${s}s`]
  return parts.filter(Boolean).join(' ')
}

export function DurationWheelInput({
  value,
  onChange,
  maxMinutes,
  secondStep,
  useHours,
  formatValue = formatDuration,
  ...props
}) {
  const [open, setOpen] = React.useState(false)
  const [localValue, setLocalValue] = React.useState(value)
  value = value ?? localValue

  const handleChange = (v) => {
    setLocalValue(v)
    onChange?.(v)
  }

  return (
    <>
      <LinkInput value={formatValue(value)} onPress={() => setOpen(true)} {...props} />
      <BottomDrawer open={open} onClose={() => setOpen(false)} snapPoints={[275]} contentProps={{ padding: 'md' }}>
        <View flex centerH>
          <DurationWheelPicker
            value={value}
            onChange={handleChange}
            maxMinutes={maxMinutes}
            secondStep={secondStep}
            useHours={useHours}
          />
        </View>
      </BottomDrawer>
    </>
  )
}
