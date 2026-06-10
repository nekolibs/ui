export function detectMeasurementSystem() {
  try {
    const locale = new Intl.Locale(navigator.language)
    const info = locale.textInfo ?? locale.getTextInfo?.()
    const ms = locale.measurementSystem ?? info?.measurementSystem
    if (ms) return ['us', 'imperial'].includes(ms) ? 'imperial' : 'metric'

    // Fallback: only US, Myanmar, Liberia use imperial
    const lang = navigator.language || ''
    if (lang.startsWith('en-US') || lang.startsWith('my-MM') || lang.startsWith('en-LR')) {
      return 'imperial'
    }
  } catch {}
  return 'metric'
}
