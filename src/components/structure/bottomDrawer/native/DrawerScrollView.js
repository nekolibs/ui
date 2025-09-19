import React from 'react'
import { ScrollView } from 'react-native'
import Animated, { useAnimatedScrollHandler, useAnimatedReaction, runOnJS } from 'react-native-reanimated'
import { useDrawerContext } from './DrawerContext'

const AnimatedScrollView = Animated.createAnimatedComponent(ScrollView)

export const DrawerScrollView = React.forwardRef((props, ref) => {
  const {
    children,
    onScroll,
    scrollEventThrottle = 16,
    showsVerticalScrollIndicator = true,
    bounces = true,
    ...scrollViewProps
  } = props

  const { scrollOffset, scrollEnabled, isScrolling } = useDrawerContext()

  const scrollRef = React.useRef(null)

  // Convert shared value to React state for the component
  const [isScrollEnabled, setIsScrollEnabled] = React.useState(true)

  React.useImperativeHandle(ref, () => scrollRef.current)

  // Handle scroll lock/unlock based on drawer position
  useAnimatedReaction(
    () => scrollEnabled.value,
    (enabled) => {
      if (!enabled && scrollOffset.value > 0) {
        runOnJS(() => {
          scrollRef.current?.scrollTo({ y: 0, animated: false })
        })()
        scrollOffset.value = 0
      }
      // Update React state
      runOnJS(setIsScrollEnabled)(enabled)
    },
    []
  )

  const handleScrollBeginDrag = React.useCallback(() => {
    isScrolling.value = true
  }, [isScrolling])

  const handleScrollEndDrag = React.useCallback(() => {
    isScrolling.value = false
  }, [isScrolling])

  const animatedScrollHandler = useAnimatedScrollHandler({
    onScroll: (event) => {
      scrollOffset.value = event.contentOffset.y

      if (onScroll) {
        runOnJS(onScroll)(event)
      }
    },
    onBeginDrag: () => {
      runOnJS(handleScrollBeginDrag)()
    },
    onEndDrag: () => {
      runOnJS(handleScrollEndDrag)()
    },
  })

  return (
    <AnimatedScrollView
      ref={scrollRef}
      style={{ flex: 1 }}
      scrollEnabled={isScrollEnabled}
      onScroll={animatedScrollHandler}
      scrollEventThrottle={scrollEventThrottle}
      showsVerticalScrollIndicator={showsVerticalScrollIndicator}
      bounces={bounces}
      {...scrollViewProps}
    >
      {children}
    </AnimatedScrollView>
  )
})

DrawerScrollView.displayName = 'DrawerScrollView'
