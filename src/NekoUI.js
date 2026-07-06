import { initFirstDayOfWeek } from './helpers/weekStartSetup'
import { DynamicStyleTag } from './DynamicStyleTag'
import { I18nProvider } from './i18n'
import { MeasurementHandler } from './components/measurements/MeasurementHandler'
import { ModalsHandler } from './components/modals/modal/handler/ModalsHandler'
import { NotificationsHandler } from './components/feedback/notifications/NotificationsHandler'
import { OverlayHandler } from './components/structure/overlay/OverlayHandler'
import { PortalHandler } from './components/helpers/PortalHandler'
import { ResponsiveHandler } from './responsive/ResponsiveHandler'
import { ThemeHandler } from './theme/ThemeHandler'
import { ThemePickerDrawer } from './components/theme'
import { useThemeHandler } from './theme'

initFirstDayOfWeek()

export function NekoUI({ children, i18n, measurementSystem, ...props }) {
  return (
    <ThemeHandler {...props}>
      <DynamicStyleTag />
      <ResponsiveHandler>
        <MeasurementHandler measurementSystem={measurementSystem}>
          <I18nProvider i18n={i18n}>
            {/* Overlay + Notifications must sit ABOVE PortalHandler: modal/drawer
                bodies teleport through <Portal> to PortalHandler's level, so any
                context below it (overlays, toasts) is unreachable from inside a
                modal. ModalsHandler stays BELOW Portal — its Modals use <Portal>. */}
            <OverlayHandler>
              <NotificationsHandler>
                <PortalHandler>
                  <ModalsHandler>
                    {children}
                    <FixedComponents />
                  </ModalsHandler>
                </PortalHandler>
              </NotificationsHandler>
            </OverlayHandler>
          </I18nProvider>
        </MeasurementHandler>
      </ResponsiveHandler>
    </ThemeHandler>
  )
}

// TODO: Move to ModalRouter when its ready
function FixedComponents() {
  const { themePickerOpen, setThemePickerOpen } = useThemeHandler()

  return <ThemePickerDrawer open={themePickerOpen} onClose={() => setThemePickerOpen(false)} />
}
