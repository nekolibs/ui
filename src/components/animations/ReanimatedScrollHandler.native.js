import { createContext, useContext, useMemo } from 'react'
import { useSharedValue, useAnimatedScrollHandler } from 'react-native-reanimated'

const ReanimatedScrollContext = createContext(null)

export function useReanimatedScroll() {
  const context = useContext(ReanimatedScrollContext)
  if (!context) throw new Error('useReanimatedScroll must be used within ReanimatedScrollHandler')
  return context
}

export function ReanimatedScrollHandler({ children }) {
  const scrollY = useSharedValue(0)

  const scrollHandler = useAnimatedScrollHandler({
    onScroll: (event) => {
      scrollY.value = event.contentOffset.y
    },
  })

  const value = useMemo(() => ({ scrollY, scrollHandler }), [])

  return <ReanimatedScrollContext.Provider value={value}>{children}</ReanimatedScrollContext.Provider>
}
