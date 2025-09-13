import { Dimensions } from 'react-native'
import { useSharedValue, withTiming, useAnimatedStyle } from 'react-native-reanimated'
import React from 'react'

const DEFAULT_EFFECT = { duration: 400, from: 'top' }
const { width, height } = Dimensions.get('window')

export function useSlideEffect([values, { slide, ...props }]) {
  if (slide === true) slide = DEFAULT_EFFECT
  if (!!slide) slide = { ...DEFAULT_EFFECT, ...slide }
  const { duration, from, distance } = slide || {}
  const { open, useRegisterEffect } = values

  useRegisterEffect(slide)

  const initialValue = React.useMemo(() => {
    switch (from) {
      case 'left':
        return -(distance || width)
      case 'right':
        return distance || width
      case 'top':
        return -(distance || height)
      case 'bottom':
        return distance || height
      default:
        return -(distance || width)
    }
  }, [from, distance, width, height])

  const translate = useSharedValue(open ? 0 : initialValue)

  React.useEffect(() => {
    if (!slide) return

    if (open) {
      translate.value = initialValue
      translate.value = withTiming(0, { duration })
    } else {
      translate.value = withTiming(initialValue, { duration })
    }
  }, [open])

  const animatedStyle = useAnimatedStyle(() => {
    const transform =
      from === 'left' || from === 'right' ? [{ translateX: translate.value }] : [{ translateY: translate.value }]
    return { transform }
  })

  if (!slide) return [values, props]

  return [values, { ...props, animatedStyles: [...props.animatedStyles, animatedStyle] }]
}
