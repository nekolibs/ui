import { useSharedValue, withTiming, useAnimatedStyle } from 'react-native-reanimated'
import React from 'react'

const DEFAULT_EFFECT = { duration: 300 }

export function useFadeEffect([values, { fade, ...props }]) {
  if (fade === true) fade = DEFAULT_EFFECT
  if (!!fade) fade = { ...DEFAULT_EFFECT, ...fade }
  const { duration } = fade || {}
  const { open, useRegisterEffect } = values
  const opacity = useSharedValue(0)

  useRegisterEffect(fade)

  React.useEffect(() => {
    if (!fade) return

    if (open) {
      opacity.value = 0
      opacity.value = withTiming(1, { duration })
    } else {
      opacity.value = withTiming(0, { duration })
    }
  }, [open])

  const animatedStyle = useAnimatedStyle(() => {
    return { opacity: opacity.value }
  })

  if (!fade) return [values, props]

  return [values, { ...props, animatedStyles: [...props.animatedStyles, animatedStyle] }]
}
