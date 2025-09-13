import { Dimensions } from 'react-native'
import { Gesture, GestureDetector } from 'react-native-gesture-handler'
import Animated, { useSharedValue, useAnimatedStyle, withSpring, withTiming, runOnJS } from 'react-native-reanimated'
import React from 'react'

export function AbsDraggableSlideView({
  from = 'left',
  distance,
  open,
  onClose,
  style,
  threshold = 0.3,
  children,
  resetOnOpen = true,
}) {
  const { width, height } = Dimensions.get('window')
  const maxDistance = from === 'left' || from === 'right' ? distance || width : distance || height
  const gestureTranslation = useSharedValue(0)

  React.useEffect(() => {
    if (resetOnOpen && open) {
      gestureTranslation.value = 0
    }
  }, [open, resetOnOpen, gestureTranslation])

  const panGesture = Gesture.Pan()
    .onUpdate((e) => {
      if (from === 'left') gestureTranslation.value = Math.min(e.translationX, 0)
      else if (from === 'right') gestureTranslation.value = Math.max(e.translationX, 0)
      else if (from === 'top') gestureTranslation.value = Math.min(e.translationY, 0)
      else gestureTranslation.value = Math.max(e.translationY, 0)
    })
    .onEnd((e) => {
      let progress
      if (from === 'left') progress = -e.translationX / maxDistance
      else if (from === 'right') progress = e.translationX / maxDistance
      else if (from === 'top') progress = -e.translationY / maxDistance
      else progress = e.translationY / maxDistance

      const shouldClose = progress > threshold
      let finalValue = from === 'left' || from === 'top' ? -maxDistance : maxDistance
      if (!shouldClose) finalValue = 0

      gestureTranslation.value = withTiming(finalValue, { duration: 200 }, (finished) => {
        if (finished && onClose && shouldClose) runOnJS(onClose)()
      })
    })

  const animatedStyle = useAnimatedStyle(() => {
    const transform =
      from === 'left' || from === 'right'
        ? [{ translateX: gestureTranslation.value }]
        : [{ translateY: gestureTranslation.value }]
    return { transform }
  })

  return (
    <GestureDetector gesture={panGesture}>
      <Animated.View style={[style, animatedStyle]}>{children}</Animated.View>
    </GestureDetector>
  )
}
