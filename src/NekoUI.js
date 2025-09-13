import { NotificationsHandler } from './components/feedback/notifications/NotificationsHandler'
import { OverlayHandler } from './components/structure/overlay/OverlayHandler'
import { PortalHandler } from './components/helpers/PortalHandler'
import { ResponsiveHandler } from './responsive/ResponsiveHandler'
import { ThemeHandler } from './theme/ThemeHandler'

export function NekoUI({ children, ...props }) {
  return (
    <ThemeHandler {...props}>
      <ResponsiveHandler>
        <PortalHandler>
          <NotificationsHandler>
            <OverlayHandler>{children}</OverlayHandler>
          </NotificationsHandler>
        </PortalHandler>
      </ResponsiveHandler>
    </ThemeHandler>
  )
}
