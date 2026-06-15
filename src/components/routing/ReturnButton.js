import { Button } from '../actions'

// Plain ReactJS (Vite/Next/CRA): react-router goBack via navigate(-1). require() in try/catch so a
// web app without react-router-dom degrades gracefully instead of failing the module load.
let useNavigate
try {
  useNavigate = require('react-router-dom').useNavigate
} catch {
  useNavigate = () => () => console.warn('ReturnButton: react-router-dom not installed.')
}

// A back/close Button. Defaults to a left-arrow icon that calls navigate(-1). `close` swaps to a
// close icon; `icon` overrides the icon name; `onPress` overrides goBack. Extra props pass to the
// Button (label, outline, size, color, etc.).
export function ReturnButton({ icon, close, onPress, ...props }) {
  const navigate = useNavigate()
  const name = icon || (close ? 'close-line' : 'arrow-left-s-line')

  return <Button icon={name} onPress={onPress || (() => navigate(-1))} {...props} />
}
