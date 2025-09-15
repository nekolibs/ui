import React from 'react'

export function useCalendarDays(currentMonth) {
  return React.useMemo(() => {
    const startWeekday = currentMonth.startOf('month').day()
    const daysInMonth = currentMonth.daysInMonth()

    const blanks = Array.from({ length: startWeekday }, () => null)
    const days = Array.from({ length: daysInMonth }, (_, i) => i + 1)
    const cells = [...blanks, ...days]

    const weekdayLabels = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']

    return { weekdayLabels, cells }
  }, [currentMonth.month(), currentMonth.year()])
}
