import React from 'react'

import { View } from '../../../structure/View'

// Web override of createDrawerScrollComponent.
//
// The native version wraps the scrollable in a Pan + Gesture.Native() to
// coordinate list-scroll vs sheet-drag. That machinery is native-only
// (blocksExternalGesture, Gesture.Native, reanimated scrollTo/useAnimatedRef)
// and, worse, react-native-gesture-handler stamps `touch-action: none` on any
// node it wraps, disabling the browser's native scrolling.
//
// On web the sheet drag is handled by the drawer handle (see BottomDrawer.web
// branch) and the content just needs to scroll via the DOM. neko FlatList's web
// output is not itself a scroll container in this context — AbsFlatList routes
// overflow to the inner content container, so the bounded outer node stays
// `overflow: visible` and never scrolls. Wrapping it in a flex `scrollY` View
// gives the bounded node the `overflow-y: auto` it needs.
export function createDrawerScrollComponent(Component) {
  return function DrawerScrollComponent({ ref, ...props }) {
    return (
      <View flex scrollY>
        <Component ref={ref} {...props} />
      </View>
    )
  }
}
