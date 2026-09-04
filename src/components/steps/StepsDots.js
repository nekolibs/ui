import React from 'react'

import { Pressable } from '../actions/Pressable'
import { View } from '../structure/View'
import { useSteps } from './StepsHandler'

function Dot({ active, locked, onPress }) {
  return (
    <Pressable
      onPress={locked ? undefined : onPress}
      width={active ? 20 : 8}
      height={8}
      round
      bg={active ? 'primary' : 'text4_op30'}
      style={{ opacity: locked ? 0.4 : 1, transition: 'all 200ms ease-in-out' }}
    />
  )
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
