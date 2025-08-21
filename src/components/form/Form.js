import React from 'react'

import { FormWrapperComponent } from './FormWrapperComponent'
import { useNewForm } from './useNewForm'

const FormContext = React.createContext(null)
export const useFormState = () => React.useContext(FormContext)
export const useFormInstance = () => useFormState()?.form
export const useForm = useFormInstance

export function Form({ form, onSubmit, initialValues, children, loading, disabled, ...props }) {
  const defaultForm = useNewForm({ onSubmit, initialValues })
  form = form || defaultForm

  return (
    <FormContext.Provider value={{ loading, disabled, form }}>
      <FormWrapperComponent form={form} gap="md" {...props}>
        {children}
      </FormWrapperComponent>
    </FormContext.Provider>
  )
}
