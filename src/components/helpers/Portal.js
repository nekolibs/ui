import React from 'react'

import { usePortal } from './PortalHandler'

let idCounter = 0

export function Portal({ children }) {
  const keyRef = React.useRef(++idCounter)
  const { mount, update, unmount } = usePortal()

  React.useEffect(() => {
    mount(keyRef.current, children)
    return () => unmount(keyRef.current)
  }, [])

  React.useEffect(() => {
    update(keyRef.current, children)
  }, [children])

  return null
}
