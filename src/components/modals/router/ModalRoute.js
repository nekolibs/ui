import { useEffect } from 'react'

import { useModalsRouterContext } from './ModalsRouterContext'

export function ModalRoute({ name, component, type = 'modal', ...containerProps }) {
  const { registerRoute, unregisterRoute } = useModalsRouterContext()

  useEffect(() => {
    if (!name || !registerRoute) return
    registerRoute(name, { component, type, containerProps })
    return () => unregisterRoute?.(name)
  }, [name])

  return null
}
