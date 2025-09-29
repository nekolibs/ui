import { mergeDeepRight, mergeDeepLeft, pipe } from 'ramda'
import React from 'react'
import tinycolor from 'tinycolor2'

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

  const formattedTheme = pipe(
    mergeDeepRight(baseDefaultTheme), //
    applyColorVariantsOnTheme,
    mergeDeepLeft(themes._all || {}) //
  )({ ...theme })

  const isDark = tinycolor(formattedTheme?.colors?.overlayBG || formattedTheme?.colors?.bg).isDark()

  return { ...formattedTheme, isDark, isLight: !isDark }
}
