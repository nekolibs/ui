import React from 'react'

// Static context — actions that never change (push, goBack, etc.)
const ModalsRouterContext = React.createContext(null)
export const useModalsRouterContext = () => React.useContext(ModalsRouterContext) || {}
export { ModalsRouterContext }

// Dynamic context — stack data that changes on push/goBack
const ModalsStackContext = React.createContext(null)
export const useModalsStackContext = () => React.useContext(ModalsStackContext) || {}
export { ModalsStackContext }

// Per-entry context — params for each rendered modal
const ModalRouteContext = React.createContext(null)
export const useModalRouteContext = () => React.useContext(ModalRouteContext) || {}
export { ModalRouteContext }
