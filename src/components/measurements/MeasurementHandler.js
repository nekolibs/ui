import React from 'react'

import { detectMeasurementSystem } from './helpers/detectMeasurementSystem'

const MeasurementContext = React.createContext(null)

export function MeasurementHandler({ children, measurementSystem }) {
  const value = React.useMemo(() => ({ measurementSystem }), [measurementSystem])

  return <MeasurementContext.Provider value={value}>{children}</MeasurementContext.Provider>
}

export function useMeasurementSystem(override) {
  const ctx = React.useContext(MeasurementContext)

  return React.useMemo(() => {
    if (override) return override
    if (ctx?.measurementSystem) return ctx.measurementSystem
    return detectMeasurementSystem()
  }, [override, ctx?.measurementSystem])
}

export function useIsImperial(override) {
  const system = useMeasurementSystem(override)
  return system === 'imperial'
}
