import tinycolor from 'tinycolor2'
import { Animated, Easing } from 'react-native'
import React from 'react'

export function AbsActivityIndicator({ size = 20, color, style }) {
  const spinValue = React.useRef(new Animated.Value(0)).current
  const bg = tinycolor(color).setAlpha(0.2).toString()

  React.useEffect(() => {
    const spinAnimation = Animated.loop(
      Animated.timing(spinValue, {
        toValue: 1,
        duration: 1000,
        easing: Easing.linear,
        useNativeDriver: false,
      })
    )
    spinAnimation.start()
    return () => spinAnimation.stop()
  }, [spinValue])

  const spin = spinValue.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  })

  const borderWidth = size / 8

  return (
    <Animated.View
      style={{
        width: size,
        height: size,
        borderRadius: size / 2,
        borderWidth: borderWidth,
        borderColor: `${bg}`,
        borderTopColor: color,
        transform: [{ rotate: spin }],
        ...style,
      }}
    />
  )
}
