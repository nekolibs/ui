import React from 'react'

const PortalContext = React.createContext(null)

export const usePortal = () => React.useContext(PortalContext) || {}

export function PortalHandler({ children }) {
  const [portals, setPortals] = React.useState([])

  const mount = React.useCallback((key, element) => {
    setPortals((prev) => [...prev, { key, element }])
  }, [])

  const update = React.useCallback((key, element) => {
    setPortals((prev) => prev.map((p) => (p.key === key ? { ...p, element } : p)))
  }, [])

  const unmount = React.useCallback((key) => {
    setPortals((prev) => prev.filter((p) => p.key !== key))
  }, [])

  const value = React.useMemo(() => ({ mount, update, unmount }), [mount, update, unmount])

  return (
    <PortalContext.Provider value={value}>
      {children}
      {portals.map((p) => (
        <React.Fragment key={p.key}>{p.element}</React.Fragment>
      ))}
    </PortalContext.Provider>
  )
}
