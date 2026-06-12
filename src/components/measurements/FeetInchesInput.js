import React from 'react'

import { BottomDrawer } from '../modals/bottomDrawer'
import { LinkInput } from '../inputs/LinkInput'
import { NumberInput } from '../inputs'
import { View } from '../structure'
import { WheelPicker } from '../inputs/WheelPicker'
import { useResponsiveValue } from '../../responsive'

const USE_BOTTOM_DRAWER = { native: true, sm: true, md: true }

function formatFeetInches(value) {
  const { feet = 0, inches = 0 } = value || {}
  if (!value || (!feet && !inches)) return ''
  return `${feet}'${inches}"`
}

function FeetInchesInline({ value, onChange, label, ...props }) {
  const { feet, inches } = value || {}

  return (
    <View row gap="sm" toBottom>
      <NumberInput
        value={feet}
        onChange={(newFeet) => onChange({ feet: newFeet, inches })}
        min={0}
        precision={0}
        flex
        label={label}
        {...props}
        suffix="ft"
      />
      <NumberInput
        value={inches}
        onChange={(newInches) => onChange({ feet, inches: newInches })}
        min={0}
        max={11}
        precision={0}
        flex
        {...props}
        suffix="in"
      />
    </View>
  )
}

const FEET_OPTIONS = Array.from({ length: 9 }, (_, i) => ({ label: i, value: i }))
const INCH_OPTIONS = Array.from({ length: 12 }, (_, i) => ({ label: i, value: i }))

function FeetInchesDrawer({ value, onChange, label, ...props }) {
  const [open, setOpen] = React.useState(false)
  const { feet = 0, inches = 0 } = value || {}

  return (
    <>
      <LinkInput
        value={formatFeetInches(value)}
        placeholder={label || props.placeholder}
        onPress={() => setOpen(true)}
        {...props}
      />
      <BottomDrawer open={open} onClose={() => setOpen(false)} snapPoints={[350]}>
        <View row gap="sm" center flex padding="md">
          <View flex>
            <WheelPicker
              options={FEET_OPTIONS}
              value={feet}
              suffix="ft"
              onChange={(f) => onChange({ feet: f, inches })}
            />
          </View>
          <View flex>
            <WheelPicker
              options={INCH_OPTIONS}
              value={inches}
              suffix="in"
              onChange={(i) => onChange({ feet, inches: i })}
            />
          </View>
        </View>
      </BottomDrawer>
    </>
  )
}

export function FeetInchesInput(props) {
  const shouldUseDrawer = useResponsiveValue(USE_BOTTOM_DRAWER)

  if (shouldUseDrawer) return <FeetInchesDrawer {...props} />
  return <FeetInchesInline {...props} />
}
