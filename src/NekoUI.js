import { OverlayHandler } from './components/structure/overlay/OverlayHandler'
import { ResponsiveHandler } from './responsive/ResponsiveHandler'
import { ThemeHandler } from './theme/ThemeHandler'

export function NekoUI({ children, ...props }) {
  return (
    <ThemeHandler {...props}>
      <ResponsiveHandler>
        <OverlayHandler>{children}</OverlayHandler>
      </ResponsiveHandler>
    </ThemeHandler>
  )
}
