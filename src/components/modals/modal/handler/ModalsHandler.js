import React from 'react'

import { Modal } from '../Modal'
import { useResponsiveValue } from '../../../../responsive/responsiveHooks'

const ModalsContext = React.createContext(null)

export const useModals = () => React.useContext(ModalsContext) || {}

let idCounter = 0

export function useModalOpener() {
  const { add, remove, close } = useModals()
  const open = (init) => {
    const key = ++idCounter

    const onClose = () => close(key)
    const params = { onClose, key }

    const data = init(params)

    add(key, { onClose, ...data, open: true })
    return params
  }

  return {
    open,
  }
}

export function ModalsHandler({ children }) {
  const width = useResponsiveValue({ sm: '100%', df: 400 })
  const [modals, setModals] = React.useState([])

  const add = React.useCallback((key, data) => {
    setModals((prev) => [...prev, { key, ...data }])
  }, [])

  const remove = React.useCallback((key) => {
    setModals((prev) => prev.filter((p) => p.key !== key))
  }, [])

  const close = React.useCallback((key) => {
    setModals((items) => items.map((i) => (i.key === key ? { ...i, open: false } : i)))
    setTimeout(() => remove(key), 600)
  }, [])

  const value = React.useMemo(() => ({ add, remove, close }), [add, remove, close])

  return (
    <ModalsContext.Provider value={value}>
      {children}

      {modals?.map?.(({ key, content, ...item }) => (
        <Modal key={key} {...item}>
          {content}
        </Modal>
      ))}
    </ModalsContext.Provider>
  )
}
