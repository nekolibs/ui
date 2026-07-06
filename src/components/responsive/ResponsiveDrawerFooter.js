import { ModalFooter } from '../modals'
import { SubmitButton } from '../form'
import { View } from '../structure'
import { useResponsiveDrawer } from './ResponsiveDrawer'

// Footer renders only on modal/drawer presentations — on native/bottomDrawer the
// submit lives in the header instead. SubmitButton reads `loading` from the
// surrounding <Form>; only the label is needed here.

function DefaultFooter({ submitLabel }) {
  return (
    <ModalFooter>
      <View row toRight gap="sm">
        <SubmitButton sm label={submitLabel} />
      </View>
    </ModalFooter>
  )
}

const FOOTERS = { view: null, bottomDrawer: null, modal: DefaultFooter, drawer: DefaultFooter }

export function ResponsiveDrawerFooter(props) {
  const ctx = useResponsiveDrawer()
  const Footer = FOOTERS[ctx.presentation]
  const useSubmitButton = props.useSubmitButton ?? ctx.useSubmitButton ?? true

  return Footer && useSubmitButton ? <Footer {...props} submitLabel={props.submitLabel ?? ctx.submitLabel} /> : null
}
