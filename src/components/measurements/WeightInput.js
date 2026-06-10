import React from 'react'

import { NumberInput } from '../inputs'
import { fixedDecimals } from '../../helpers/numbers'
import { WEIGHT_CONVERTERS, WEIGHT_IMPERIAL_DEFAULTS } from './helpers/weight'
import { useIsImperial } from './MeasurementHandler'

export function WeightInput({
  value,
  onChange,
  measurementSystem,
  metricPrecision = 'kg',
  imperialPrecision,
  ...props
}) {
  const isImperial = useIsImperial(measurementSystem)
  const impPrec = imperialPrecision || WEIGHT_IMPERIAL_DEFAULTS[metricPrecision] || 'lbs'
  const converter = isImperial ? WEIGHT_CONVERTERS[metricPrecision]?.[impPrec] : null

  let suffix = isImperial ? impPrec : metricPrecision
  let formattedValue = converter ? converter.to(value) : fixedDecimals(value)

  const [localValue, setLocalValue] = React.useState(formattedValue)

  function handleChange(newValue) {
    setLocalValue(newValue)
    if (!newValue && newValue !== 0) return onChange(newValue)
    if (converter) newValue = converter.from(newValue)
    onChange(newValue)
  }

  return <NumberInput {...props} value={localValue} onChange={handleChange} suffix={suffix} />
}
