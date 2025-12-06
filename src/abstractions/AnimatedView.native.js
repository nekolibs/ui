import Animated from 'react-native-reanimated'

export function AbsAnimatedView({ children, style, animatedStyles = [] }) {
  return <Animated.View style={[style, ...animatedStyles]}>{children}</Animated.View>
}
