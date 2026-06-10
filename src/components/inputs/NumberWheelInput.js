import React from 'react'

import { BottomDrawer } from '../modals/bottomDrawer'
import { LinkInput } from './LinkInput'
import { NumberWheelPicker } from './NumberWheelPicker'
import { View } from '../structure/View'

export function NumberWheelInput({
  value,
  onChange,
  min,
  max,
  step,
  decimalStep,
  useInt,
  precision,
  suffix,
  ...props
}) {
  const [open, setOpen] = React.useState(false)
  const [localValue, setLocalValue] = React.useState(value)
  value = value ?? localValue

  const handleChange = (v) => {
    setLocalValue(v)
    onChange?.(v)
  }

  const displayValue = value != null ? `${value}${suffix ? ` ${suffix}` : ''}` : ''

  return (
    <>
      <LinkInput value={displayValue} onPress={() => setOpen(true)} {...props} />
      <BottomDrawer open={open} onClose={() => setOpen(false)} snapPoints={[275]} contentProps={{ padding: 'md' }}>
        <View flex centerH>
          <NumberWheelPicker
            value={value}
            onChange={handleChange}
            min={min}
            max={max}
            step={step}
            decimalStep={decimalStep}
            useInt={useInt}
            precision={precision}
          />
        </View>
      </BottomDrawer>
    </>
  )
}
