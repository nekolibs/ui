import dayjs from 'dayjs'
import React from 'react'

export function useCalendarDays(currentMonth) {
  return React.useMemo(() => {
    if (!currentMonth?.isValid?.()) currentMonth = dayjs()
    const startWeekday = currentMonth.startOf('month').day()
    const daysInMonth = currentMonth.daysInMonth()

    const blanks = Array.from({ length: startWeekday }, () => null)
    const days = Array.from({ length: daysInMonth }, (_, i) => i + 1)
    const cells = [...blanks, ...days]

    return { cells }
  }, [currentMonth.month(), currentMonth.year()])
}
