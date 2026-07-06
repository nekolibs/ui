import { Button } from '../actions/Button'
import { useFormInstance, useFormState } from './Form'

export function SubmitButton({ form, disabled, loading, Wrapper, ...props }) {
  const formState = useFormState()
  const contextForm = useFormInstance()
  form = form || contextForm
  disabled = formState?.disabled || disabled
  // Default loading from the surrounding <Form> so submit buttons reflect the
  // form's submitting state without threading `loading` through by hand.
  loading = loading ?? formState?.loading

  Wrapper = Wrapper || Button

  const handleSubmit = () => {
    if (!form) {
      console.error('No form provided to useWatch. Pass it as params or wrap it inside a <Form> component.')
      return
    }

    form.handleSubmit()
  }

  return <Wrapper {...props} loading={loading} disabled={disabled} onPress={handleSubmit} />
}
