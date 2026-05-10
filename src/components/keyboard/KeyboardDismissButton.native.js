import { Keyboard } from 'react-native'
import Animated, { useAnimatedKeyboard, useAnimatedStyle, KeyboardState, withTiming } from 'react-native-reanimated'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

import { Button } from '../actions'

const STATIC_STYLE = { position: 'absolute', right: 5, zIndex: 1000 }

export function KeyboardDismissButton() {
  const keyboard = useAnimatedKeyboard()
  const { bottom: bottomInset } = useSafeAreaInsets()

  const animatedStyle = useAnimatedStyle(() => {
    const isVisible = keyboard.height.value > 0
    return {
      bottom: keyboard.height.value - bottomInset + 10,
      opacity: keyboard.state.value === KeyboardState.CLOSING ? withTiming(0, { duration: 150 }) : isVisible ? 1 : 0,
      pointerEvents: isVisible ? 'auto' : 'none',
    }
  })

  return (
    <Animated.View style={[STATIC_STYLE, animatedStyle]}>
      <Button
        icon="arrow-down-box-line"
        onPress={Keyboard.dismiss}
        ratio={1}
        shadow
        overlayBG
        sm
        opacity={0.85}
        iconProps={{ size: 'md' }}
        border
        borderColor="divider"
      />
    </Animated.View>
  )
}
