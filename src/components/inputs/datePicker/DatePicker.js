import { DayPicker } from './DayPicker'
import { MonthPicker } from './MonthPicker'
import { QuarterPicker } from './QuarterPicker'
import { WeekPicker } from './WeekPicker'
import { YearPicker } from './YearPicker'

export function DatePicker({ type, ...props }) {
  switch (type) {
    case 'year':
      return <YearPicker {...props} />

    case 'quarter':
      return <QuarterPicker {...props} />

    case 'month':
      return <MonthPicker {...props} />

    case 'week':
      return <WeekPicker {...props} />

    default:
      return <DayPicker {...props} />
  }
}
