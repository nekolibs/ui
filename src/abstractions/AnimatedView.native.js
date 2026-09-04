import Animated from 'react-native-reanimated'

// `onClick` reaches the DOM on react-native-web (backdrop click-to-close); native ignores it.
export function AbsAnimatedView({ children, style, animatedStyles = [], onPress, onClick }) {
  return (
    <Animated.View style={[style, ...animatedStyles]} onClick={onClick || onPress}>
      {children}
    </Animated.View>
  )
}
