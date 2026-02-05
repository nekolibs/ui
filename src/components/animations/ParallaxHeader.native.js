import Animated, { useAnimatedStyle, interpolate, Extrapolation } from 'react-native-reanimated'

import { useReanimatedScroll } from './ReanimatedScrollHandler'

const SCALE_FACTOR = 2

export function ParallaxHeader({ children, height = 200, parallaxSpeed = 0.5, disableResistence }) {
  const { scrollY } = useReanimatedScroll()

  const imageStyle = useAnimatedStyle(() => {
    const scale = scrollY.value < 0 ? 1 + (Math.abs(scrollY.value) / height) * SCALE_FACTOR : 1
    const translateY =
      scrollY.value < 0 ? 0 : interpolate(scrollY.value, [0, height], [0, height * parallaxSpeed], Extrapolation.CLAMP)
    return { transform: [{ translateY }, { scale }] }
  })

  const containerStyle = useAnimatedStyle(() => {
    let calcHeight = height
    if (disableResistence) calcHeight = scrollY.value < 0 ? height + Math.abs(scrollY.value) : height
    return {
      height: calcHeight,
      overflow: scrollY.value < 0 ? 'visible' : 'hidden',
      zIndex: -1,
    }
  })

  return (
    <Animated.View style={containerStyle}>
      <Animated.View style={imageStyle}>{children}</Animated.View>
    </Animated.View>
  )
}
