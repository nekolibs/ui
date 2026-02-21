import { Gesture, GestureDetector } from 'react-native-gesture-handler'
import Animated, {
  useSharedValue,
  useAnimatedScrollHandler,
  useAnimatedRef,
  scrollTo,
  withSpring,
  runOnJS,
} from 'react-native-reanimated'
import React from 'react'

import { findClosestSnapPoint, clamp } from './utils'
import { useDrawerContext } from './DrawerContext'

export function createDrawerScrollComponent(Component) {
  const AnimatedComponent = Animated.createAnimatedComponent(Component)

  function DrawerScrollComponent({ ref, onScroll, ...props }) {
    const {
      translateY,
      panRef,
      normalizedSnapPoints,
      SCREEN_HEIGHT,
      maxSnapPoint,
      minSnapPoint,
      handleClose,
      animationConfig,
      snapIndex,
    } = useDrawerContext()

    const scrollRef = useAnimatedRef()
    const scrollOffset = useSharedValue(0)
    const prevTranslationY = useSharedValue(0)
    const drawerMoved = useSharedValue(false)

    React.useImperativeHandle(ref, () => scrollRef.current)

    const maxPosition = SCREEN_HEIGHT - maxSnapPoint

    const panGesture = React.useMemo(() => {
      return Gesture.Pan()
        .activeOffsetY([-10, 10])
        .blocksExternalGesture(panRef)
        .onStart(() => {
          prevTranslationY.value = 0
          drawerMoved.value = false
        })
        .onUpdate((event) => {
          const delta = event.translationY - prevTranslationY.value
          prevTranslationY.value = event.translationY

          const currentY = translateY.value
          const atMaxSnap = currentY <= maxPosition + 1
          const atScrollTop = scrollOffset.value <= 0

          if (drawerMoved.value) {
            const newY = clamp(currentY + delta, maxPosition, SCREEN_HEIGHT)
            translateY.value = newY
            scrollTo(scrollRef, 0, 0, false)

            if (newY <= maxPosition + 1 && delta < 0) {
              drawerMoved.value = false
            }
          } else if (!atMaxSnap) {
            drawerMoved.value = true
            const newY = clamp(currentY + delta, maxPosition, SCREEN_HEIGHT)
            translateY.value = newY
            scrollTo(scrollRef, 0, 0, false)
          } else if (atScrollTop && delta > 0) {
            drawerMoved.value = true
            const newY = clamp(currentY + delta, maxPosition, SCREEN_HEIGHT)
            translateY.value = newY
            scrollTo(scrollRef, 0, 0, false)
          }
        })
        .onEnd((event) => {
          if (!drawerMoved.value) return

          const currentPosition = SCREEN_HEIGHT - translateY.value
          const velocity = event.velocityY

          const shouldClose =
            !!handleClose &&
            (velocity > 1500 ||
              (velocity > 800 && currentPosition < minSnapPoint) ||
              currentPosition < minSnapPoint * 0.35)

          if (shouldClose) {
            runOnJS(handleClose)()
          } else {
            const closestSnapIndex = findClosestSnapPoint(currentPosition, normalizedSnapPoints, velocity)
            const targetSnapPoint = normalizedSnapPoints[closestSnapIndex]
            translateY.value = withSpring(SCREEN_HEIGHT - targetSnapPoint, animationConfig)
            snapIndex.value = closestSnapIndex
          }
        })
    }, [panRef, maxPosition, normalizedSnapPoints, minSnapPoint, handleClose, animationConfig])

    const nativeGesture = React.useMemo(() => Gesture.Native(), [])

    const composedGesture = React.useMemo(
      () => Gesture.Simultaneous(panGesture, nativeGesture),
      [panGesture, nativeGesture]
    )

    const animatedScrollHandler = useAnimatedScrollHandler({
      onScroll: (event) => {
        scrollOffset.value = event.contentOffset.y
        if (onScroll) {
          runOnJS(onScroll)(event)
        }
      },
    })

    return (
      <GestureDetector gesture={composedGesture}>
        <AnimatedComponent
          ref={scrollRef}
          style={{ flex: 1 }}
          onScroll={animatedScrollHandler}
          scrollEventThrottle={16}
          bounces={false}
          overScrollMode="never"
          {...props}
        />
      </GestureDetector>
    )
  }

  return DrawerScrollComponent
}
