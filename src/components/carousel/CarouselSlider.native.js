import React from 'react'
import { Gesture, GestureDetector } from 'react-native-gesture-handler'
import Animated, { useSharedValue, useAnimatedStyle, withTiming, runOnJS } from 'react-native-reanimated'

import { View } from '../structure/View'
import { useCarousel } from './CarouselHandler'

function SlideContent({ item }) {
  const Content = React.useMemo(
    () => item.render || item.renderContent || item.Content,
    [item.render, item.renderContent, item.Content]
  )
  return Content ? <Content /> : null
}

function clampIndex(index, count, loop) {
  'worklet'
  if (loop) return ((index % count) + count) % count
  return Math.max(0, Math.min(index, count - 1))
}

export function CarouselSlider() {
  const { items, activeIndex, itemsCount, draggable, goTo, pauseAutoplay, resumeAutoplay, loop } = useCarousel()

  const [slideWidth, setSlideWidth] = React.useState(0)
  const translateX = useSharedValue(0)
  const gestureStartX = useSharedValue(0)

  React.useEffect(() => {
    if (slideWidth > 0) {
      translateX.value = withTiming(-activeIndex * slideWidth, { duration: 300 })
    }
  }, [activeIndex, slideWidth])

  const onLayout = React.useCallback((e) => {
    setSlideWidth(e.nativeEvent.layout.width)
  }, [])

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: translateX.value }],
  }))

  if (!items?.length) return null

  const minTranslate = -(itemsCount - 1) * slideWidth
  const maxTranslate = 0

  const panGesture = Gesture.Pan()
    .onStart(() => {
      gestureStartX.value = translateX.value
      runOnJS(pauseAutoplay)()
    })
    .onUpdate((e) => {
      const raw = gestureStartX.value + e.translationX
      if (loop) {
        translateX.value = raw
      } else {
        // Rubber band resistance at edges
        if (raw > maxTranslate) {
          translateX.value = maxTranslate + (raw - maxTranslate) * 0.3
        } else if (raw < minTranslate) {
          translateX.value = minTranslate + (raw - minTranslate) * 0.3
        } else {
          translateX.value = raw
        }
      }
    })
    .onEnd((e) => {
      const threshold = slideWidth * 0.25
      let targetIndex = activeIndex

      if (e.translationX < -threshold || e.velocityX < -500) {
        targetIndex = activeIndex + 1
      } else if (e.translationX > threshold || e.velocityX > 500) {
        targetIndex = activeIndex - 1
      }

      const clamped = clampIndex(targetIndex, itemsCount, loop)
      translateX.value = withTiming(-clamped * slideWidth, { duration: 300 })
      runOnJS(goTo)(targetIndex)
      runOnJS(resumeAutoplay)()
    })

  const track = (
    <Animated.View style={[{ flexDirection: 'row', width: slideWidth * itemsCount }, animatedStyle]}>
      {items.map((item) => (
        <View key={item.key} style={{ width: slideWidth }}>
          <SlideContent item={item} />
        </View>
      ))}
    </Animated.View>
  )

  return (
    <View hiddenOverflow fullW onLayout={onLayout}>
      {draggable ? <GestureDetector gesture={panGesture}>{track}</GestureDetector> : track}
    </View>
  )
}
