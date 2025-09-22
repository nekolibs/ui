import { ModalsHandler } from './components/structure/modal/handler/ModalsHandler'
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
          <ModalsHandler>
            <NotificationsHandler>
              <OverlayHandler>{children}</OverlayHandler>
            </NotificationsHandler>
          </ModalsHandler>
        </PortalHandler>
      </ResponsiveHandler>
    </ThemeHandler>
  )
}
