import { getThemeValue } from './relatedScales'

export function mergePreset(presets, key, props, defaultKey) {
  if (!key) return props
  const preset = getThemeValue(presets, key, false) || getThemeValue(presets, defaultKey, {})
  return { ...props, ...preset }
}
