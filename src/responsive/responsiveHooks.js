import { is } from 'ramda'
import React from 'react'

import { Platform } from '../abstractions/Platform'
import { useBreakpoints } from '../theme/ThemeHandler'
import { useResponsive } from '../responsive/ResponsiveHandler'

export function useGetResponsiveValue() {
  const breakpoints = useBreakpoints()
  const { width, screen } = useResponsive()

  return React.useCallback(
    (value) => {
      const isNative = value?.native !== undefined && Platform.OS !== 'web'
      if (isNative) return value?.native

      const isWeb = value?.web !== undefined && Platform.OS === 'web'
      if (isWeb) return value?.web

      const isIOS = value?.ios !== undefined && Platform.OS === 'ios'
      if (isIOS) return value?.ios

      const isAndroid = value?.android !== undefined && Platform.OS === 'android'
      if (isAndroid) return value?.android

      const isObj = is(Object, value)

      if (!isObj) return value

      // Only treat the object as a responsive descriptor when it actually
      // carries breakpoint / platform / df keys. A non-empty plain object
      // (e.g. titleProps) passes through untouched. An empty object carries
      // no info either way, so it falls through to the df (undefined) result
      // instead of returning itself truthy.
      const bpNames = breakpoints.map((b) => b.name)
      const isResponsiveKey = (k) =>
        k === 'df' ||
        k === 'native' ||
        k === 'web' ||
        k === 'ios' ||
        k === 'android' ||
        bpNames.includes(k) ||
        (/^(\w+)[du]$/.test(k) && bpNames.includes(k.slice(0, -1)))
      const objKeys = Object.keys(value)
      if (objKeys.length > 0 && !objKeys.some(isResponsiveKey)) return value

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
