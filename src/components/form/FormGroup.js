import React from 'react'

const FormGroupContext = React.createContext(null)
const useGroupPath = () => React.useContext(FormGroupContext)?.path || []

export function useRelativePath(name, opts) {
  const { relative } = opts
  const listPath = !!name ? (Array.isArray(name) ? name : [name]) : []
  const parentPath = useGroupPath()

  if (!relative) return listPath

  return [...parentPath, ...listPath]
}

export function FormGroup({ name, children }) {
  const path = useRelativePath(name, { relative: true })
  const value = { path }

  return <FormGroupContext.Provider value={value}>{children}</FormGroupContext.Provider>
}
