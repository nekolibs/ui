import { getThemeValue } from './relatedScales'

export function mergePreset(presets, key, props, defaultKey) {
  if (!key) return props
  const preset = getThemeValue(presets, key, false) || getThemeValue(presets, defaultKey, {})
  // preset is the base; explicit props override it (consistent with rest of lib)
  return { ...preset, ...props }
}
