import { GestureDetector } from 'react-native-gesture-handler'
import React from 'react'

import { View } from '../../../structure/View'

// Web: drag-to-close is bound to the handle only, so the pan never covers the
// scrollable list. `hitSlop` enlarges the interactive region beyond the handle's
// visual bounds — no layout change, unlike padding. The View wrapper gives the
// gesture a stable host to attach to: DrawerHandle can render null when hidden
// and doesn't forward its own ref (neko View forwards ref via its prop spread on
// React 19).
export function HandleGestureDetector({ gesture, children }) {
  const withSlop = React.useMemo(() => gesture.hitSlop({ vertical: 16 }), [gesture])
  return (
    <GestureDetector gesture={withSlop}>
      <View fullW>{children}</View>
    </GestureDetector>
  )
}
