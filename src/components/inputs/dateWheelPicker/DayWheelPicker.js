import dayjs from 'dayjs'

import { ClearLink } from '../../actions/ClearLink'
import { View } from '../../structure'
import { useColors } from '../../../theme'

let DatePicker

try {
  DatePicker = require('@quidone/react-native-wheel-picker').DatePicker
} catch {
  DatePicker = null
}

export function DayWheelPicker({ value, onChange, min, max, onCheckDisabled, allowClear, ...props }) {
  const colors = useColors()
  if (!DatePicker) {
    console.warn('@quidone/react-native-wheel-picker not installed.')
    return null
  }

  value = value ? dayjs(value) : dayjs()

  return (
    <View center height={40 * 5} overflow="hidden" relative>
      <DatePicker
        locale={'pt'}
        date={value.format('YYYY-MM-DD')}
        minDate={min ? dayjs(min).format('YYYY-MM-DD') : undefined}
        maxDate={max ? dayjs(max).format('YYYY-MM-DD') : undefined}
        onDateChanged={({ date }) => onChange(dayjs(date))}
        itemTextStyle={{ color: colors.text }}
        itemHeight={40}
        overlayItemStyle={{
          backgroundColor: 'transparent',
          borderWidth: 1,
          borderLeftWidth: 0,
          borderRightWidth: 0,
          borderColor: colors.divider,
          opacity: 1,
        }}
        {...props}
      />

      <ClearLink hide={!allowClear} value={value} onChange={onChange} />
    </View>
  )
}
