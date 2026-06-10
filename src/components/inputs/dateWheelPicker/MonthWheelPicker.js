import { View } from '../../structure'
import { DayWheelPicker } from './DayWheelPicker'

let DatePickerDate
try {
  DatePickerDate = require('@quidone/react-native-wheel-picker').DatePicker.Date
} catch {
  DatePickerDate = null
}

const renderHiddenDate = () => (
  <View width={0} hiddenOverflow pointerEvents="none">
    {DatePickerDate ? <DatePickerDate /> : null}
  </View>
)

export function MonthWheelPicker({ value, ...props }) {
  return <DayWheelPicker {...props} value={value?.startOf?.('month') ?? value} renderDate={renderHiddenDate} />
}
