import { Icon } from '../presentation'
import { Link } from '../actions'

// Plain ReactJS (Vite/Next/CRA): react-router goBack via navigate(-1). require() in try/catch so a
// web app without react-router-dom degrades gracefully instead of failing the module load.
let useNavigate
try {
  useNavigate = require('react-router-dom').useNavigate
} catch {
  useNavigate = () => () => console.warn('ReturnLink: react-router-dom not installed.')
}

// A back/close Link: a Link wrapping an Icon. Defaults to a left-arrow that calls navigate(-1).
// `close` swaps to a close icon; `icon` overrides the icon name entirely; `onPress` overrides goBack.
// Extra props pass to the Icon (size, color, etc.).
export function ReturnLink({ icon, close, onPress, ...props }) {
  const navigate = useNavigate()
  const name = icon || (close ? 'close-line' : 'arrow-left-s-line')

  return (
    <Link onPress={onPress || (() => navigate(-1))}>
      <Icon name={name} {...props} />
    </Link>
  )
}
