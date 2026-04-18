import React from 'react'

import { FormWrapperComponent } from './FormWrapperComponent'
import { LoadingView } from '../state/LoadingView'
import { useNewForm } from './useNewForm'

const FormContext = React.createContext(null)
export const useFormState = () => React.useContext(FormContext)
export const useFormInstance = () => useFormState()?.form
export const useForm = useFormInstance

export function Form({ form, onSubmit, onValuesChange, initialValues, children, loading, disabled, ...props }) {
  const defaultForm = useNewForm({ onSubmit, onValuesChange, initialValues })
  form = form || defaultForm

  // Keep external form's callbacks in sync with Form props
  if (form._callbacksRef) {
    if (onSubmit) form._callbacksRef.current.onSubmit = onSubmit
    if (onValuesChange) form._callbacksRef.current.onValuesChange = onValuesChange
  }

  return (
    <FormContext.Provider value={{ loading, disabled, form }}>
      <LoadingView active={loading} noWrapper>
        <FormWrapperComponent form={form} onSubmit={onSubmit} gap="md" {...props}>
          {children}
        </FormWrapperComponent>
      </LoadingView>
    </FormContext.Provider>
  )
}
