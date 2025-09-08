import React from 'react'

import { useBreakpoints } from '../theme/ThemeHandler'
import { useWindowWidth } from '../abstractions/helpers/windowWidth'

const ResponsiveContext = React.createContext(null)

export const useResponsive = () => React.useContext(ResponsiveContext)

export function ResponsiveHandler({ children }) {
  const width = useWindowWidth()

  const breakpoints = useBreakpoints()

  const screen = React.useMemo(() => {
    if (!breakpoints?.length) return false
    for (let i = 0; i < breakpoints.length; i++) {
      if (width < breakpoints[i].value) {
        return breakpoints[i].name
      }
    }
    return breakpoints[breakpoints.length - 1]?.name
  }, [width, breakpoints])

  const value = React.useMemo(() => ({ width, screen }), [width, screen])

  return <ResponsiveContext.Provider value={value}>{children}</ResponsiveContext.Provider>
}
