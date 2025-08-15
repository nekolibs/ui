import { mergeDeepRight } from 'ramda'
import React from 'react'

import { DEFAULT_LIGHT_THEME } from './default/lightTheme'
import { DEFAULT_THEMES } from './default/themes'
import { useFormattedTheme } from './format/formatTheme'

const ThemeContext = React.createContext(null)
export const useThemeHandler = () => React.useContext(ThemeContext) || {}
export const useTheme = () => useThemeHandler().theme || DEFAULT_LIGHT_THEME

export const useColors = () => useTheme().colors || {}
const getColor = (colors, key) => colors[key] || key
export const useGetColor = () => {
  const colors = useColors()
  return (key) => getColor(colors, key)
}

export const useSpaces = () => useTheme().spaces || {}
const getSpace = (spaces, key) => spaces[key] || key
export const useGetSpace = () => {
  const spaces = useSpaces()
  return (key) => getSpace(spaces, key)
}

export const useRadius = () => useTheme().radius || {}
const getRadius = (radius, key) => radius[key] || key
export const useGetRadius = () => {
  const radius = useRadius()
  return (key) => getRadius(radius, key)
}

export const useTexts = () => useTheme().texts || {}

export function mergePreset(presets, key, props, defaultKey) {
  if (!key) return props
  const preset = presets[key] || presets[defaultKey]
  return { ...props, ...preset }
}

export const useElementHeights = () => useTheme().elementHeights || {}
const getElementHeight = (elementHeights, key) => elementHeights[key] || key
export const useGetElementHeight = () => {
  const elementHeights = useElementHeights()
  return (key) => getElementHeight(elementHeights, key)
}

export const useThemeComponents = () => useTheme().components || {}
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
