import React from 'react'
import Animated, { useAnimatedStyle, withTiming } from 'react-native-reanimated'

import { Pressable } from '../actions/Pressable'
import { View } from '../structure/View'
import { useColors } from '../../theme/ThemeHandler'
import { useSteps } from './StepsHandler'

function Dot({ active, locked, onPress }) {
  const colors = useColors()

  const animatedStyle = useAnimatedStyle(
    () => ({
      width: withTiming(active ? 20 : 8, { duration: 200 }),
      opacity: withTiming(locked ? 0.4 : 1, { duration: 200 }),
      backgroundColor: withTiming(active ? colors.primary : colors.text4_op30, { duration: 200 }),
    }),
    [active, locked]
  )

  const dot = <Animated.View style={[{ height: 8, borderRadius: 4 }, animatedStyle]} />
  return locked ? dot : <Pressable onPress={onPress}>{dot}</Pressable>
}

export function StepsDots(props) {
  const { items, activeIndex, maxIndexReleased, moveToIndex } = useSteps()

  if (!items?.length) return null

  return (
    <View row center gap="xs" paddingV="sm" {...props}>
      {items.map((item, index) => (
        <Dot
          key={item.key}
          active={index === activeIndex}
          locked={index > maxIndexReleased}
          onPress={() => moveToIndex(index)}
        />
      ))}
    </View>
  )
}
