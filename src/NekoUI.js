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
