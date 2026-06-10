import { DayWheelPicker } from './DayWheelPicker'
import { MonthWheelPicker } from './MonthWheelPicker'
import { QuarterWheelPicker } from './QuarterWheelPicker'
import { WeekWheelPicker } from './WeekWheelPicker'
import { YearWheelPicker } from './YearWheelPicker'

export function DateWheelPicker({ type, ...props }) {
  switch (type) {
    case 'year':
      return <YearWheelPicker {...props} />

    case 'quarter':
      return <QuarterWheelPicker {...props} />

    case 'month':
      return <MonthWheelPicker {...props} />

    case 'week':
      return <WeekWheelPicker {...props} />

    default:
      return <DayWheelPicker {...props} />
  }
}
