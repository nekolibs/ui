import { mergeDeepRight, pipe } from 'ramda'
import React from 'react'

import { DEFAULT_LIGHT_THEME } from '../default/lightTheme'
import { DEFAULT_THEMES } from '../default/themes'
import { applyColorVariantsOnTheme } from './colorsVariations'

export function useFormattedTheme(themes, key) {
  themes = themes || DEFAULT_THEMES
  return React.useMemo(() => formatTheme(themes, key), [key])
}

export function formatTheme(themes, key) {
  themes = themes || DEFAULT_THEMES
  const theme = themes[key] || DEFAULT_THEMES[key] || DEFAULT_LIGHT_THEME
  const baseDefaultTheme = DEFAULT_THEMES[theme.base] || DEFAULT_THEMES[key] || DEFAULT_LIGHT_THEME

  return pipe(
    mergeDeepRight(baseDefaultTheme), //
    applyColorVariantsOnTheme
  )({ ...theme })
}
