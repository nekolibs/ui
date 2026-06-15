import { Button } from '../actions'

// react-navigation goBack. require() in try/catch so a native app without react-navigation degrades
// gracefully instead of failing the module load.
let useNavigation
try {
  useNavigation = require('@react-navigation/native').useNavigation
} catch {
  useNavigation = () => ({ goBack: () => console.warn('ReturnButton: @react-navigation/native not installed.') })
}

// A back/close Button. Defaults to a left-arrow icon that calls navigation.goBack(). `close` swaps to
// a close icon; `icon` overrides the icon name; `onPress` overrides goBack. Extra props pass to the
// Button (label, outline, size, color, etc.).
export function ReturnButton({ icon, close, onPress, ...props }) {
  const navigation = useNavigation()
  const name = icon || (close ? 'close-line' : 'arrow-left-s-line')

  return <Button icon={name} onPress={onPress || (() => navigation.goBack())} {...props} />
}
