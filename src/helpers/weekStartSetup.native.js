import { setFirstDayOfWeek } from './weekStart'

export function initFirstDayOfWeek() {
  try {
    const Localization = require('expo-localization')
    const cal = Localization.getCalendars()[0]
    if (cal?.firstWeekday != null) {
      setFirstDayOfWeek((cal.firstWeekday - 1) % 7)
    }
  } catch {}
}
