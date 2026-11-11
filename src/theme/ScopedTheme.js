import React from 'react'

import { ThemeContext, useThemeHandler } from './ThemeHandler'
import { formatTheme } from './format/formatTheme'

export function ScopedTheme({ theme: key, children }) {
  const parent = useThemeHandler()
  const theme = React.useMemo(
    () => (key ? formatTheme(parent.rawThemesParam, key) : null),
    [parent.rawThemesParam, key]
  )
  const value = React.useMemo(() => ({ ...parent, theme }), [parent, theme])

  if (!theme) return children
  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
}
