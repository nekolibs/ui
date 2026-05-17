import dayjs from 'dayjs'
import React from 'react'

import { getFirstDayOfWeek } from '../../../helpers/weekStart'

export function useCalendarDays(currentMonth) {
  return React.useMemo(() => {
    if (!currentMonth?.isValid?.()) currentMonth = dayjs()
    const startWeekday = currentMonth.startOf('month').day()
    const firstDay = getFirstDayOfWeek()
    const offset = (startWeekday - firstDay + 7) % 7
    const daysInMonth = currentMonth.daysInMonth()

    const blanks = Array.from({ length: offset }, () => null)
    const days = Array.from({ length: daysInMonth }, (_, i) => i + 1)
    const cells = [...blanks, ...days]

    return { cells }
  }, [currentMonth.month(), currentMonth.year()])
}
