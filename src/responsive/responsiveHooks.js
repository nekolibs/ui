import { is } from 'ramda'
import React from 'react'

import { useBreakpoints } from '../theme/ThemeHandler'
import { useResponsive } from '../responsive/ResponsiveHandler'

export function useGetResponsiveValue() {
  const breakpoints = useBreakpoints()
  const { width, screen } = useResponsive()

  return React.useCallback(
    (value) => {
      const isObj = is(Object, value)

      if (!isObj) return value

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
    },
    [screen]
  )
}

export function useResponsiveValue(value) {
  const getValue = useGetResponsiveValue()

  const isObj = is(Object, value)
  const valueWatch = isObj ? Object.keys(value).map((k) => `${k}:${value[k]}`) : [value]

  return React.useMemo(() => getValue(value), [getValue, ...valueWatch])
}
