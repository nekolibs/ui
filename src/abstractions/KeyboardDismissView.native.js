import { Keyboard, Pressable } from 'react-native'

export function AbsKeyboardDismissView({ children, style }) {
  return (
    <Pressable onPress={Keyboard.dismiss} accessible={false} style={style}>
      {children}
    </Pressable>
  )
}
