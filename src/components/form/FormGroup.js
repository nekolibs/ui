import React from 'react'

const FormGroupContext = React.createContext(null)
const useGroupPath = () => React.useContext(FormGroupContext)?.path || []

export function useRelativePath(name, opts) {
  const { isAbsolutePath } = opts
  const listPath = !!name ? (Array.isArray(name) ? name : [name]) : []
  const parentPath = useGroupPath()

  if (!!isAbsolutePath) return listPath

  return [...parentPath, ...listPath]
}

export function FormGroup({ name, children }) {
  const path = useRelativePath(name, { isAbsolutePath: false })
  const value = { path }

  return <FormGroupContext.Provider value={value}>{children}</FormGroupContext.Provider>
}
