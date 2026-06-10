export function detectMeasurementSystem() {
  try {
    const Localization = require('expo-localization')
    const locales = Localization.getLocales()
    const ms = locales?.[0]?.measurementSystem
    if (ms) return ['us', 'imperial'].includes(ms) ? 'imperial' : 'metric'
  } catch {}
  return 'metric'
}
