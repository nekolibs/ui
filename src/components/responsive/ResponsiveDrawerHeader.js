import { ModalHeader } from '../modals'
import { Platform } from '../../abstractions'
import { ReturnLink } from '../routing'
import { SubmitButton } from '../form'
import { TopBar } from '../structure'
import { useResponsiveDrawer } from './ResponsiveDrawer'

// SubmitButton reads `loading` from the surrounding <Form>, so headers only need
// to know WHETHER to show a submit and its label — both come from the
// ResponsiveDrawer provider (or a direct prop override).

function NativeHeader({ onClose, useSubmitButton, useNativeView, submitLabel, ...props }) {
  return (
    <TopBar
      left={<ReturnLink onPress={onClose} close={!useNativeView} />}
      right={useSubmitButton && <SubmitButton label={submitLabel} paddingH="md" />}
      useSafeArea={{ ios: !!useNativeView, df: true }}
      bg="overlayBG"
      borderB
      {...props}
    />
  )
}

function MddHeader({ onClose, useSubmitButton, submitLabel, ...props }) {
  return (
    <TopBar
      left={<ReturnLink onPress={onClose} close />}
      right={useSubmitButton && <SubmitButton label={submitLabel} paddingH="md" />}
      useSafeArea={false}
      borderB
      marginT={Platform.OS === 'web' ? 0 : -15}
      {...props}
    />
  )
}

function DefaultHeader({ useSubmitButton, submitLabel, ...props }) {
  return <ModalHeader {...props} />
}

const HEADERS = { view: NativeHeader, bottomDrawer: MddHeader, modal: DefaultHeader, drawer: DefaultHeader }

export function ResponsiveDrawerHeader(props) {
  const ctx = useResponsiveDrawer()
  const Header = HEADERS[ctx.presentation]

  return (
    <Header
      {...props}
      onClose={props.onClose ?? ctx.onClose}
      useSubmitButton={props.useSubmitButton ?? ctx.useSubmitButton}
      submitLabel={props.submitLabel ?? ctx.submitLabel}
    />
  )
}
