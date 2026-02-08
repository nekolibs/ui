import { Button } from '../actions/Button'
import { useFormInstance, useFormState } from './Form'

export function SubmitButton({ form, disabled, Wrapper, ...props }) {
  const formState = useFormState()
  const contextForm = useFormInstance()
  form = form || contextForm
  disabled = formState?.disabled || disabled

  Wrapper = Wrapper || Button

  const handleSubmit = () => {
    if (!form) {
      console.error('No form provided to useWatch. Pass it as params or wrap it inside a <Form> component.')
      return
    }

    form.handleSubmit()
  }

  return <Wrapper {...props} disabled={disabled} onPress={handleSubmit} />
}
