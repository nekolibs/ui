import { DynamicStyleTag } from './DynamicStyleTag'
import { I18nProvider } from './i18n'
import { ModalsHandler } from './components/structure/modal/handler/ModalsHandler'
import { NotificationsHandler } from './components/feedback/notifications/NotificationsHandler'
import { OverlayHandler } from './components/structure/overlay/OverlayHandler'
import { PortalHandler } from './components/helpers/PortalHandler'
import { ResponsiveHandler } from './responsive/ResponsiveHandler'
import { ThemeHandler } from './theme/ThemeHandler'
import { ThemePickerDrawer } from './components/theme'
import { useThemeHandler } from './theme'

export function NekoUI({ children, i18n, ...props }) {
  return (
    <ThemeHandler {...props}>
      <DynamicStyleTag />
      <ResponsiveHandler>
        <PortalHandler>
          <ModalsHandler>
            <I18nProvider i18n={i18n}>
              <NotificationsHandler>
                <OverlayHandler>
                  {children}
                  <FixedComponents />
                </OverlayHandler>
              </NotificationsHandler>
            </I18nProvider>
          </ModalsHandler>
        </PortalHandler>
      </ResponsiveHandler>
    </ThemeHandler>
  )
}

// TODO: Move to ModalRouter when its ready
function FixedComponents() {
  const { themePickerOpen, setThemePickerOpen } = useThemeHandler()

  return <ThemePickerDrawer open={themePickerOpen} onClose={() => setThemePickerOpen(false)} />
}
