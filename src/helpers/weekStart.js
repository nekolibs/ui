import dayjs from 'dayjs'
import updateLocale from 'dayjs/esm/plugin/updateLocale'

dayjs.extend(updateLocale)

let _override = null

export function getFirstDayOfWeek() {
  if (_override !== null) return _override
  return dayjs().$locale().weekStart || 0
}

export function setFirstDayOfWeek(day) {
  _override = day
  dayjs.updateLocale(dayjs().$locale().name || 'en', { weekStart: day })
}

export function getOrderedWeekdays() {
  const first = getFirstDayOfWeek()
  return Array.from({ length: 7 }, (_, i) => (first + i) % 7)
}

export function getWeekdayOffset(dayIndex) {
  return (dayIndex - getFirstDayOfWeek() + 7) % 7
}
