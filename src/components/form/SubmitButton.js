import { Button } from '../actions/Button'
import { useFormInstance } from './Form'

export function SubmitButton({ form, ...props }) {
  const contextForm = useFormInstance()
  form = form || contextForm

  const handleSubmit = () => {
    if (!form) {
      console.error('No form provided to useWatch. Pass it as params or wrap it inside a <Form> component.')
      return
    }

    form.handleSubmit()
  }

  return <Button {...props} onPress={handleSubmit} />
}
