import React from 'react'

import { View } from '../structure/View'
import { getElementSize } from '../../abstractions/helpers/componentSize'

const LayoutContext = React.createContext({})
export const useLayout = () => React.useContext(LayoutContext) || {}

export function Layout({ children, ...rootProps }) {
  const [layoutHeaderSpace, setLayoutHeaderSpace] = React.useState(0)
  const [layoutSiderSpace, setLayoutSiderSpace] = React.useState(0)

  const registerHeader = (space) => setLayoutHeaderSpace((v) => v + space)
  const unregisterHeader = (space) => setLayoutHeaderSpace((v) => v - space)

  const [layoutSize, setLayoutSize] = React.useState({})
  const layoutRef = React.useRef(null)

  React.useLayoutEffect(() => {
    getElementSize(layoutRef, setLayoutSize)
  }, [])

  const value = {
    layoutSize,
    layoutHeaderSpace,
    setLayoutHeaderSpace,
    layoutSiderSpace,
    layoutSiderSpace,
    registerHeader,
    unregisterHeader,
  }

  return (
    <LayoutContext.Provider value={value}>
      <View className="neko-layout" bg="mainBG" flex relative {...rootProps} ref={layoutRef}>
        {children}
      </View>
    </LayoutContext.Provider>
  )
}
