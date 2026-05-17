import { setFirstDayOfWeek } from './weekStart'

export function initFirstDayOfWeek() {
  try {
    const locale = new Intl.Locale(navigator.language)
    const weekInfo = locale.weekInfo ?? locale.getWeekInfo?.()
    if (weekInfo?.firstDay != null) {
      setFirstDayOfWeek(weekInfo.firstDay === 7 ? 0 : weekInfo.firstDay)
    }
  } catch {}
}
