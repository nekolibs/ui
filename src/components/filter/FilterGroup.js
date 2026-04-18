import React from 'react'

const FilterGroupContext = React.createContext(null)
const useGroupPath = () => React.useContext(FilterGroupContext)?.path || []

export function useFilterPath(name) {
  const listPath = !!name ? (Array.isArray(name) ? name : [name]) : []
  const parentPath = useGroupPath()
  return [...parentPath, ...listPath]
}

export function FilterGroup({ name, children }) {
  const path = useFilterPath(name)
  const value = { path }

  return <FilterGroupContext.Provider value={value}>{children}</FilterGroupContext.Provider>
}
