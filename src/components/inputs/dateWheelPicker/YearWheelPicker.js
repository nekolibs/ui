import { View } from '../../structure'
import { DayWheelPicker } from './DayWheelPicker'

let DatePickerDate, DatePickerMonth
try {
  const dp = require('@quidone/react-native-wheel-picker').DatePicker
  DatePickerDate = dp.Date
  DatePickerMonth = dp.Month
} catch {
  DatePickerDate = null
  DatePickerMonth = null
}

const renderHiddenDate = () => (
  <View width={0} hiddenOverflow pointerEvents="none">
    {DatePickerDate ? <DatePickerDate /> : null}
  </View>
)

const renderHiddenMonth = () => (
  <View width={0} hiddenOverflow pointerEvents="none">
    {DatePickerMonth ? <DatePickerMonth /> : null}
  </View>
)

export function YearWheelPicker({ value, ...props }) {
  return (
    <DayWheelPicker
      {...props}
      value={value?.startOf?.('year') ?? value}
      renderDate={renderHiddenDate}
      renderMonth={renderHiddenMonth}
    />
  )
}
