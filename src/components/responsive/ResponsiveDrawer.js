import { createContext, useContext } from 'react'
import { mergeDeepRight } from 'ramda'

import { BottomDrawer, Drawer, Modal } from '../modals'
import { View } from '../structure'
import { useResponsiveValue } from '../../responsive/responsiveHooks'

const PRESENTATIONS = { view: View, bottomDrawer: BottomDrawer, drawer: Drawer, modal: Modal }
const DEFAULT_PRESENTATION = { native: 'view', mdd: 'bottomDrawer', df: 'drawer' }

const ResponsiveDrawerContext = createContext({})
export const useResponsiveDrawer = () => useContext(ResponsiveDrawerContext)

export function ResponsiveDrawer({
  open,
  onClose,
  children,
  presentation,
  useSubmitButton,
  submitLabel,
  responsiveProps = {},
  ...props
}) {
  const key = useResponsiveValue(
    typeof presentation === 'string' ? presentation : mergeDeepRight(DEFAULT_PRESENTATION, presentation || {})
  )
  const Wrapper = PRESENTATIONS[key]
  responsiveProps = useResponsiveValue(mergeDeepRight(responsiveProps, { native: { flex: true } }))

  return (
    <Wrapper open={open} onClose={onClose} noLayout {...props} {...responsiveProps}>
      {/* Provider INSIDE the Wrapper: web Modal/Drawer teleport children via a
          Portal host, so a provider outside the Wrapper wouldn't reach them. */}
      <ResponsiveDrawerContext.Provider value={{ presentation: key, onClose, useSubmitButton, submitLabel }}>
        {children}
      </ResponsiveDrawerContext.Provider>
    </Wrapper>
  )
}
