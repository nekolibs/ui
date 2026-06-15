import { Icon } from '../presentation'
import { Link } from '../actions'

// react-navigation goBack. require() in try/catch so a native app without react-navigation degrades
// gracefully instead of failing the module load.
let useNavigation
try {
  useNavigation = require('@react-navigation/native').useNavigation
} catch {
  useNavigation = () => ({ goBack: () => console.warn('ReturnLink: @react-navigation/native not installed.') })
}

// A back/close Link: a Link wrapping an Icon. Defaults to a left-arrow that calls navigation.goBack().
// `close` swaps to a close icon; `icon` overrides the icon name entirely; `onPress` overrides goBack.
// Extra props pass to the Icon (size, color, etc.).
export function ReturnLink({ icon, close, onPress, ...props }) {
  const navigation = useNavigation()
  const name = icon || (close ? 'close-line' : 'arrow-left-s-line')

  return (
    <Link onPress={onPress || (() => navigation.goBack())}>
      <Icon name={name} {...props} />
    </Link>
  )
}
