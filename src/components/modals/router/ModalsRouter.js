import React, { useCallback, useMemo, useRef, useState } from 'react'

import { BottomDrawer } from '../bottomDrawer'
import { Drawer } from '../drawer'
import { Modal } from '../modal/Modal'
import { ModalRouteContext, ModalsRouterContext, ModalsStackContext } from './ModalsRouterContext'

const CONTAINERS = {
  modal: Modal,
  drawer: Drawer,
  bottomDrawer: BottomDrawer,
}

export function ModalsRouter({ children }) {
  const [stack, setStack] = useState([])
  const [renderStack, setRenderStack] = useState([])
  const [containerOverrides, setContainerOverrides] = useState({})
  const keyRef = useRef(0)
  const routesRef = useRef({})

  const registerRoute = useCallback((name, config) => {
    routesRef.current[name] = config
  }, [])

  const unregisterRoute = useCallback((name) => {
    delete routesRef.current[name]
  }, [])

  const updateContainerProps = useCallback((key, props) => {
    setContainerOverrides((prev) => ({
      ...prev,
      [key]: { ...prev[key], ...props },
    }))
  }, [])

  const push = useCallback((path, params) => {
    const key = ++keyRef.current
    const entry = { key, path, params }
    setStack((prev) => [...prev, entry])
    setRenderStack((prev) => [...prev, { ...entry, open: true }])
  }, [])

  const closeByKey = useCallback((key) => {
    setStack((prev) => prev.filter((e) => e.key !== key))
    setRenderStack((prev) => prev.map((e) => (e.key === key ? { ...e, open: false } : e)))
    setTimeout(() => {
      setRenderStack((prev) => prev.filter((e) => e.key !== key))
    }, 600)
  }, [])

  const goBack = useCallback(() => {
    setStack((prev) => {
      if (prev.length === 0) return prev
      const last = prev[prev.length - 1]
      setRenderStack((rs) => rs.map((e) => (e.key === last.key ? { ...e, open: false } : e)))
      setTimeout(() => {
        setRenderStack((rs) => rs.filter((e) => e.key !== last.key))
      }, 600)
      return prev.slice(0, -1)
    })
  }, [])

  const closeAll = useCallback(() => {
    setStack([])
    setRenderStack((prev) => {
      const closing = prev.map((e) => ({ ...e, open: false }))
      setTimeout(() => {
        setRenderStack([])
      }, 600)
      return closing
    })
  }, [])

  // Static — never changes, so consumers like useModalsNavigation
  // and ModalRoute don't re-render when the stack changes
  const actionsValue = useMemo(
    () => ({ push, goBack, closeAll, registerRoute, unregisterRoute }),
    [push, goBack, closeAll, registerRoute, unregisterRoute]
  )

  // Dynamic — only useAllModalsParams subscribes to this
  const stackValue = useMemo(() => ({ stack }), [stack])

  // Nest modals inside each other so each RN Modal presents from
  // the previous modal's view controller (required for iOS stacking).
  // Context providers go INSIDE Container children so they survive
  // the Portal teleport on web (Portal re-mounts content at PortalHandler level).
  const nestedModals = renderStack.reduceRight((inner, entry) => {
    const route = routesRef.current[entry.path]
    if (!route) return inner

    const Container = CONTAINERS[route.type] || Modal
    const Component = route.component

    const overrides = containerOverrides[entry.key]
    const updateContainer = (props) => updateContainerProps(entry.key, props)

    return (
      <Container key={entry.key} open={entry.open} onClose={() => closeByKey(entry.key)} {...route.containerProps} {...overrides}>
        <ModalsRouterContext.Provider value={actionsValue}>
          <ModalsStackContext.Provider value={stackValue}>
            <ModalRouteContext.Provider value={{ params: entry.params, path: entry.path, key: entry.key, updateContainer }}>
              <Component />
              {inner}
            </ModalRouteContext.Provider>
          </ModalsStackContext.Provider>
        </ModalsRouterContext.Provider>
      </Container>
    )
  }, null)

  return (
    <ModalsRouterContext.Provider value={actionsValue}>
      <ModalsStackContext.Provider value={stackValue}>
        {children}
        {nestedModals}
      </ModalsStackContext.Provider>
    </ModalsRouterContext.Provider>
  )
}
