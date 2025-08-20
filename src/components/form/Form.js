import React from 'react'

import { FormWrapperComponent } from './FormWrapperComponent'
import { useNewForm } from './useNewForm'

const FormContext = React.createContext(null)
export const useFormInstance = () => React.useContext(FormContext)
export const useForm = useFormInstance

export function Form({ form, onSubmit, initialValues, children, ...props }) {
  const defaultForm = useNewForm({ onSubmit, initialValues })
  form = form || defaultForm

  return (
    <FormContext.Provider value={form}>
      <FormWrapperComponent form={form} {...props}>
        {children}
      </FormWrapperComponent>
    </FormContext.Provider>
  )
}
