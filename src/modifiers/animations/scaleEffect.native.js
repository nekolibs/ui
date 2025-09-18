import { useSharedValue, withTiming, useAnimatedStyle } from 'react-native-reanimated'
import React from 'react'

const DEFAULT_EFFECT = { duration: 300, initialScale: 0 }

export function useScaleEffect([values, { scale, ...props }]) {
  if (scale === true) scale = DEFAULT_EFFECT
  if (!!scale) scale = { ...DEFAULT_EFFECT, ...scale }
  const { duration, initialScale } = scale || {}
  const { open, useRegisterEffect } = values
  const scaleValue = useSharedValue(initialScale)

  useRegisterEffect(scale)

  React.useEffect(() => {
    if (!scale) return

    if (open) {
      scaleValue.value = initialScale
      scaleValue.value = withTiming(1, { duration })
    } else {
      scaleValue.value = withTiming(initialScale, { duration })
    }
  }, [open])

  const animatedStyle = useAnimatedStyle(() => {
    return { transform: [{ scale: scaleValue.value }] }
  })

  if (!scale) return [values, props]

  return [values, { ...props, animatedStyles: [...props.animatedStyles, animatedStyle] }]
}