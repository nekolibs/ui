import { OverlayHandler } from './components/structure/overlay/OverlayHandler'
import { ThemeHandler } from './theme/ThemeHandler'

export function NekoUI({ children, ...props }) {
  return (
    <ThemeHandler {...props}>
      <OverlayHandler>{children}</OverlayHandler>
    </ThemeHandler>
  )
}
