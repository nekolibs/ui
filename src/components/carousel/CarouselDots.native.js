import React from 'react'
import Animated, { useAnimatedStyle, withTiming } from 'react-native-reanimated'

import { Pressable } from '../actions/Pressable'
import { View } from '../structure/View'
import { useColors } from '../../theme/ThemeHandler'
import { useCarousel } from './CarouselHandler'

function Dot({ active, onPress }) {
  const colors = useColors()

  const animatedStyle = useAnimatedStyle(() => ({
    width: withTiming(active ? 20 : 8, { duration: 200 }),
    backgroundColor: withTiming(active ? colors.primary : colors.text4_op30, { duration: 200 }),
  }), [active])

  return (
    <Pressable onPress={onPress}>
      <Animated.View style={[{ height: 8, borderRadius: 4 }, animatedStyle]} />
    </Pressable>
  )
}

export function CarouselDots(props) {
  const { items, activeIndex, goTo } = useCarousel()

  if (!items?.length) return null

  return (
    <View row center gap="xs" paddingV="sm" {...props}>
      {items.map((item, index) => (
        <Dot key={item.key} active={index === activeIndex} onPress={() => goTo(index)} />
      ))}
    </View>
  )
}
