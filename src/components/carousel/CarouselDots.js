import React from 'react'

import { Pressable } from '../actions/Pressable'
import { View } from '../structure/View'
import { useCarousel } from './CarouselHandler'

function Dot({ active, onPress }) {
  return (
    <Pressable
      onPress={onPress}
      width={active ? 20 : 8}
      height={8}
      round
      bg={active ? 'primary' : 'text4_op30'}
      style={{ transition: 'all 200ms ease-in-out' }}
    />
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
