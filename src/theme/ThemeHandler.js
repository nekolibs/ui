import React from 'react'

const ThemeContext = React.createContext(null)
export const useThemeHandler = () => React.useContext(ThemeContext) || {}

export function ThemeHandler({ themes, children }) {
  const value = {}

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
}
