import React from 'react'

import { FormWrapperComponent } from './FormWrapperComponent'

const FormContext = React.createContext(null)
export const useFormInstance = () => React.useContext(FormContext)

export function Form({ form, children }) {
  return (
    <FormContext.Provider value={form}>
      <FormWrapperComponent form={form}>{children}</FormWrapperComponent>
    </FormContext.Provider>
  )
}
