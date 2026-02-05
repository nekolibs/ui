import Animated, { useAnimatedStyle, useSharedValue, useAnimatedReaction, withTiming } from 'react-native-reanimated'

import { TopBar } from '../structure'
import { useReanimatedScroll } from './ReanimatedScrollHandler'
import { useSafeAreaInsets } from '../../abstractions/helpers/useSafeAreaInsets'

export function AnimatedTopBar({ showAfter = 90, duration = 250, fade = true, slide, ...props }) {
  const { scrollY } = useReanimatedScroll()
  const { top: safeTop } = useSafeAreaInsets()

  const visibility = useSharedValue(0)

  useAnimatedReaction(
    () => scrollY.value >= showAfter - safeTop,
    (shouldShow, prev) => {
      if (shouldShow !== prev) {
        visibility.value = withTiming(shouldShow ? 1 : 0, { duration })
      }
    }
  )

  const animatedStyle = useAnimatedStyle(() => {
    const style = {}
    if (fade) style.opacity = visibility.value
    if (slide) style.transform = [{ translateY: (1 - visibility.value) * (-50 - safeTop) }]
    return style
  })

  return (
    <Animated.View style={[{ position: 'absolute', top: 0, left: 0, right: 0, zIndex: 90 }, animatedStyle]}>
      <TopBar {...props} />
    </Animated.View>
  )
}
