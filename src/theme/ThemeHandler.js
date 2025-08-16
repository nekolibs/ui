import { mergeDeepRight } from 'ramda'
import React from 'react'

import { DEFAULT_LIGHT_THEME } from './default/lightTheme'
import { getThemeValue } from './helpers/relatedScales'
import { useFormattedTheme } from './format/formatTheme'

const ThemeContext = React.createContext(null)
export const useThemeHandler = () => React.useContext(ThemeContext) || {}
export const useTheme = (groupKey) => {
  const theme = useThemeHandler().theme || DEFAULT_LIGHT_THEME
  if (!groupKey) return theme
  return theme?.[groupKey] || {}
}

export const useGetThemeValue = (groupKey) => {
  const group = useTheme(groupKey)
  return (key) => getThemeValue(group, key)
}

export const useColors = () => useTheme('colors')
export const useGetColor = () => useGetThemeValue('colors')

export const useSpaces = () => useTheme('spaces')
export const useGetSpace = () => useGetThemeValue('spaces')

export const useRadius = () => useTheme('radius')
export const useGetRadius = () => useGetThemeValue('radius')

export const useElementHeights = () => useTheme('elementHeights')
export const useGetElementHeight = () => useGetThemeValue('elementHeights')

export const useTexts = () => useTheme('texts')
export const useGetText = () => useGetThemeValue('text')

export const useThemeComponents = () => useTheme('components')
export function useThemeComponent(name) {
  const components = useThemeComponents()
  return components[name] || {}
}
export function useMergeThemeComponent(name, props) {
  const themeProps = useThemeComponent(name)
  return mergeDeepRight(themeProps, props)
}

export function ThemeHandler({ themes, initTheme, children }) {
  const [activeThemeKey, setActiveThemeKey] = React.useState(initTheme || 'light')
  const theme = useFormattedTheme(themes, activeThemeKey)
  const value = { theme, themes, activeThemeKey, setActiveThemeKey }

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
}
