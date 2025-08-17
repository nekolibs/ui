import { is } from 'ramda'

import { useBreakpoints } from '../theme/ThemeHandler'
import { useWindowWidth } from '../abstractions/windowWidth'

export function useResponsiveScreen() {
  const breakpoints = useBreakpoints()
  const width = useWindowWidth()
  if (!breakpoints?.length) return false

  // Find which breakpoint range we're in
  for (let i = 0; i < breakpoints.length; i++) {
    if (width < breakpoints[i].value) {
      return breakpoints[i].name
    }
  }

  // If width is greater than all breakpoints, return the last one
  return breakpoints[breakpoints.length - 1]?.name
}

export function useResponsiveValue(value) {
  const breakpoints = useBreakpoints()
  const width = useWindowWidth()
  const screen = useResponsiveScreen()

  if (!is(Object, value)) return value

  if (value[screen]) return value[screen]

  const keys = Object.keys(value)
  for (let k of keys) {
    const match = k.match(/^(\w+)([du])$/)
    if (!match) continue

    const bpName = match[1]
    const mode = match[2]

    const bpIndex = breakpoints.findIndex((b) => b.name === bpName)
    if (bpIndex === -1) continue

    // For "up", use the lower boundary of the range (previous breakpoint value)
    // For "down", use the upper boundary of the range (current breakpoint value)
    if (mode === 'u') {
      const lowerBound = bpIndex > 0 ? breakpoints[bpIndex - 1].value : 0
      if (width >= lowerBound) return value[k]
    }
    if (mode === 'd') {
      if (width < breakpoints[bpIndex].value) return value[k]
    }
  }

  return value?.df
}
