import { Linking, TouchableOpacity as RNTouchableOpacity } from 'react-native'

export function AbsTouchableOpacity({ href, target, link, onPress, ...props }) {
  const handlePress = href
    ? (e) => { onPress?.(e); Linking.openURL(href) }
    : onPress

  return <RNTouchableOpacity onPress={handlePress} {...props} />
}
